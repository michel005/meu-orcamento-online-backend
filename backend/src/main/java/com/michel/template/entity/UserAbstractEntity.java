package com.michel.template.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.lang.reflect.Field;

@Data
public abstract class UserAbstractEntity extends AbstractEntity {

    @DBRef
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    public void merge(UserAbstractEntity target) {
        for (Field field : this.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            try {
                field.set(this, field.get(target));
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        this.setCreateDateTime(target.getCreateDateTime());
    }
}
