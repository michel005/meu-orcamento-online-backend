package com.michel.template.api;

import com.michel.template.entity.Invite;
import com.michel.template.entity.InviteStatus;
import com.michel.template.entity.User;
import com.michel.template.model.ChangePasswordModel;
import com.michel.template.model.LoginModel;
import com.michel.template.repository.InviteRepository;
import com.michel.template.repository.UserRepository;
import com.michel.template.service.AwsS3Service;
import com.michel.template.service.MailService;
import com.michel.template.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserAPI {

    private static final String USER_PICTURE_NAME = "profile_picture.png";

    @Autowired
    private AwsS3Service awsS3Service;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private MailService mailService;

    @Autowired
    private InviteRepository inviteRepository;

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        User user = authenticationService.getUser(auth);
        authenticationService.makeBasicAuthHeader(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginModel loginModel) throws NoSuchAlgorithmException {
        Optional<User> optionalUser = userRepository.findByEmail(loginModel.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!optionalUser.get().getPassword().equals(SecurityUtils.sha256(loginModel.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        authenticationService.makeBasicAuthHeader(optionalUser.get());
        return ResponseEntity.ok(optionalUser.get());
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody User user) throws NoSuchAlgorithmException {
        user.setId(UUID.randomUUID());
        List<String> errors = new ArrayList<>();
        if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
            errors.add("Nome completo é uma informação obrigatórioa!");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            errors.add("E-mail é uma informação obrigatórioa!");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            errors.add("Senha é uma informação obrigatórioa!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errors);
        }
        Optional<Invite> invite = inviteRepository.findByCode(user.getInviteCode());
        if (invite.isEmpty() || !invite.get().getEmail().equals(user.getEmail()) || !invite.get().getConfirmEmailCode().equals(user.getConfirmCode().toString())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("O convite informado não existe ou não foi endereçado a este e-mail!");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("O e-mail informado já foi utilizado por outro usuário!");
        }
        user.setPassword(SecurityUtils.sha256(user.getPassword()));
        user.setLastUpdate(LocalDateTime.now());
        authenticationService.makeBasicAuthHeader(user);
        mailService.welcomeMail(user.getEmail(), user.getFullName());

        invite.get().setStatus(InviteStatus.DONE);
        inviteRepository.save(invite.get());

        return ResponseEntity.ok(userRepository.save(user));
    }

    @PutMapping("update")
    public ResponseEntity<?> update(Authentication auth, @RequestBody User user) {
        User currentUser = authenticationService.getUser(auth);
        List<String> errors = new ArrayList<>();
        if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
            errors.add("Nome completo é uma informação obrigatórioa!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(errors);
        }
        currentUser.setPhoneNumber(user.getPhoneNumber());
        currentUser.setAddress(user.getAddress());
        currentUser.setFullName(user.getFullName());
        currentUser.setLastUpdate(LocalDateTime.now());
        currentUser = userRepository.save(currentUser);
        authenticationService.makeBasicAuthHeader(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("updateImage")
    public ResponseEntity<?> updateImage(Authentication auth, @RequestParam("image") MultipartFile multipartFile) {
        User currentUser = authenticationService.getUser(auth);
        awsS3Service.uploadFile("user/" + currentUser.getId().toString(), USER_PICTURE_NAME, multipartFile);
        String imageUrl = awsS3Service.getFile("user/" + currentUser.getId().toString(), USER_PICTURE_NAME);
        currentUser.setProfileImage(imageUrl);
        currentUser.setLastUpdate(LocalDateTime.now());
        currentUser = userRepository.save(currentUser);
        authenticationService.makeBasicAuthHeader(currentUser);
        return ResponseEntity.ok().body(currentUser);
    }

    @DeleteMapping("removeImage")
    public ResponseEntity<?> removeImage(Authentication auth) {
        User currentUser = authenticationService.getUser(auth);
        awsS3Service.removeFile("user/" + currentUser.getId().toString(), USER_PICTURE_NAME);
        currentUser.setProfileImage(null);
        currentUser.setLastUpdate(LocalDateTime.now());
        currentUser = userRepository.save(currentUser);
        authenticationService.makeBasicAuthHeader(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("updatePassword")
    public ResponseEntity<?> updatePassword(Authentication auth, @RequestBody ChangePasswordModel changePasswordModel) throws NoSuchAlgorithmException {
        User currentUser = authenticationService.getUser(auth);
        if (!(SecurityUtils.sha256(changePasswordModel.getOldPassword())).equals(currentUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Senha atual incorreta!");
        }
        if (!changePasswordModel.getNewPassword().equals(changePasswordModel.getPasswordConfirm())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Nova senha e sua confirmação não são iguais!");
        }
        currentUser.setPassword(SecurityUtils.sha256(changePasswordModel.getNewPassword()));
        currentUser.setLastUpdate(LocalDateTime.now());
        userRepository.save(currentUser);

        mailService.changePasswordMail(currentUser.getEmail(), currentUser.getFullName(), new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        return ResponseEntity.ok().build();
    }

    @PostMapping("recoverPassword")
    public ResponseEntity<?> recoverPassword(@RequestParam("email") String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        optionalUser.get().setRecoverCode(Math.round(Math.random() * 1000000000));
        userRepository.save(optionalUser.get());

        mailService.passwordRecoverMail(
            optionalUser.get().getEmail(),
            optionalUser.get().getFullName(),
            new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()),
            optionalUser.get().getRecoverCode().toString()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("validateRecoverCode")
    public ResponseEntity<?> validateRecoverCode(@RequestParam("email") String email, @RequestParam("recoverCode") Long recoverCode) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty() || !optionalUser.get().getRecoverCode().equals(recoverCode)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("changeRecoveredPassword")
    public ResponseEntity<?> changeRecoveredPassword(@RequestParam("email") String email, @RequestParam("recoverCode") Long recoverCode, @RequestBody ChangePasswordModel changePasswordModel) throws NoSuchAlgorithmException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty() || !optionalUser.get().getRecoverCode().equals(recoverCode)) {
            return ResponseEntity.notFound().build();
        }
        if (!changePasswordModel.getNewPassword().equals(changePasswordModel.getPasswordConfirm())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Nova senha e sua confirmação não são iguais!");
        }
        optionalUser.get().setPassword(SecurityUtils.sha256(changePasswordModel.getNewPassword()));
        optionalUser.get().setLastUpdate(LocalDateTime.now());
        optionalUser.get().setRecoverCode(null);
        userRepository.save(optionalUser.get());

        mailService.changePasswordMail(optionalUser.get().getEmail(), optionalUser.get().getFullName(), new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        return ResponseEntity.ok().build();
    }

}
