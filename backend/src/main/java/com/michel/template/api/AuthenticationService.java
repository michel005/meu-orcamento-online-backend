package com.michel.template.api;

import com.michel.template.entity.User;
import com.michel.template.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public User getUser(Authentication authentication) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return null;
        }
        return userFinded.get();
    }

    public void makeBasicAuthHeader(User user) {
        try {
            user.setAuthHeader("Basic " + Base64.getEncoder().encodeToString((user.getEmail() + ":" + user.getPassword()).getBytes()));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
