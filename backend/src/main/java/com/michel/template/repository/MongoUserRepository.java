package com.michel.template.repository;

import com.michel.template.entity.UserAbstractEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.UUID;

@NoRepositoryBean
public interface MongoUserRepository<E extends UserAbstractEntity> extends MongoRepository<E, UUID> {

    @Query("{user: ?0}")
    List<E> findByUser(UUID userid);

    @Query("{user: ?0}")
    void deleteByUser(UUID userid);

}