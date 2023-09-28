package com.michel.template.api;

import com.michel.template.entity.Invite;
import com.michel.template.entity.InviteStatus;
import com.michel.template.entity.User;
import com.michel.template.model.SendInviteModel;
import com.michel.template.repository.InviteRepository;
import com.michel.template.repository.UserRepository;
import com.michel.template.service.MailService;
import com.michel.template.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/invite")
public class InviteAPI {

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private MailService mailService;

    @Value("${project.fullName}")
    private String projectFullName;

    @PostMapping("/send")
    public ResponseEntity<?> send(Authentication auth, @RequestBody SendInviteModel sendInviteModel) throws InterruptedException {
        User user = authenticationService.getUser(auth);

        Invite invite = new Invite();
        invite.setCreateDateTime(LocalDateTime.now());
        invite.setId(UUID.randomUUID());
        invite.setUser(user);
        invite.setEmail(sendInviteModel.getEmail());
        invite.setCustomMessage(sendInviteModel.getMessage());
        invite.setCode(Math.round(Math.random() * 1000000000) + "");
        invite.setConfirmEmailCode(Math.round(Math.random() * 1000000000) + "");
        invite.setStatus(InviteStatus.PENDENT);
        invite = inviteRepository.save(invite);

        mailService.inviteMail(invite);
        return ResponseEntity.ok(invite);
    }

    @GetMapping("validate")
    public ResponseEntity<?> validate(@RequestParam("code") String code) {
        Optional<Invite> invite = inviteRepository.findByCode(code);
        if (invite.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        mailService.confirmEmailCode(invite.get().getEmail(), new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()), invite.get().getConfirmEmailCode());
        return ResponseEntity.ok(invite.get().getEmail());
    }

    @GetMapping("confirmCode")
    public ResponseEntity<?> confirmCode(@RequestParam("code") String code, @RequestParam("confirm") String confirm) {
        Optional<Invite> invite = inviteRepository.findByCode(code);
        if (invite.isEmpty() || !confirm.equals(invite.get().getConfirmEmailCode())) {
            return ResponseEntity.notFound().build();
        }
        if (userRepository.findByEmail(invite.get().getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Este usuário já esta cadastrado! Acesse o sistema utilizando o mesmo e-mail. Caso não se lembre da senha, utilize a opção \"Esqueci minha senha\"");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> findAllByUser(Authentication auth) {
        User user = authenticationService.getUser(auth);
        return ResponseEntity.ok(inviteRepository.findByUser(user.getId()));
    }

}
