package com.michel.template.repository;

import com.michel.template.entity.Invite;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface InviteRepository extends MongoUserRepository<Invite> {
    @Query("{code: ?0}")
    Optional<Invite> findByCode(String code);
}
