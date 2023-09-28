package com.michel.template.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("template_invite")
public class Invite extends UserAbstractEntity {

    private String email;
    private String customMessage;
    private String code;
    private String confirmEmailCode;
    private InviteStatus status;

}
