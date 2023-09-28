package com.michel.template.repository;

import com.michel.template.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends MongoRepository<User, UUID> {

    @Query("{email: ?0}")
    Optional<User> findByEmail(String email);
}
