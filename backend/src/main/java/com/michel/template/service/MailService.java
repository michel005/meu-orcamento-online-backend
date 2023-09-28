package com.michel.template.service;

import com.michel.template.entity.Invite;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.TreeMap;

@Service
public class MailService {

    @Autowired
    private Configuration fmConfiguration;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${project.fullName}")
    private String projectFullName;

    @Value("${spring.mail.username}")
    private String defaultSender;

    @Value("${project.supportEmail}")
    private String supportEmail;

    @Value("${project.mainURL}")
    private String mainURL;

    public void welcomeMail(String to, String userName) {
        Map<String, Object> model = new TreeMap<>();
        model.put("userName", userName);
        sendEmail("Bem Vindo - " + projectFullName, to, "welcome.html", model);
    }

    public void passwordRecoverMail(String to, String userName, String date, String recoverCode) {
        Map<String, Object> model = new TreeMap<>();
        model.put("userName", userName);
        model.put("date", date);
        model.put("recoverCode", recoverCode);
        sendEmail("Recuperação de Senha - " + projectFullName, to, "passwordRecover.html", model);
    }

    public void confirmEmailCode(String to, String date, String confirmCode) {
        Map<String, Object> model = new TreeMap<>();
        model.put("date", date);
        model.put("confirmCode", confirmCode);
        sendEmail("Confirmação de E-mail - " + projectFullName, to, "emailConfirm.html", model);
    }

    public void changePasswordMail(String to, String userName, String date) {
        Map<String, Object> model = new TreeMap<>();
        model.put("userName", userName);
        model.put("date", date);
        sendEmail("Mudança de Senha - " + projectFullName, to, "passwordChange.html", model);
    }

    public void inviteMail(Invite invite) {
        Map<String, Object> model = new TreeMap<>();
        model.put("userName", invite.getUser().getFullName());
        model.put("userEmail", invite.getUser().getEmail());
        model.put("code", invite.getCode());
        model.put("customMessage", invite.getCustomMessage());
        sendEmail("Convite - " + projectFullName, invite.getEmail(), "invite.html", model);
    }

    public void sendEmail(String subject, String to, String template, Map<String, Object> model) {
        model.put("projectFullName", projectFullName);
        model.put("supportEmail", supportEmail);
        model.put("mainURL", mainURL);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom(defaultSender);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setText(geContentFromTemplate(template, model), true);
            javaMailSender.send(mimeMessageHelper.getMimeMessage());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public String geContentFromTemplate(String file, Map<String, Object> model) {
        StringBuilder content = new StringBuilder();
        try {
            content.append(FreeMarkerTemplateUtils.processTemplateIntoString(fmConfiguration.getTemplate(file), model));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }
}