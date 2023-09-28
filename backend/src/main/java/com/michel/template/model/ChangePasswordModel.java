package com.michel.template.model;

import lombok.Data;

@Data
public class ChangePasswordModel {

    private String oldPassword;
    private String newPassword;
    private String passwordConfirm;

}
