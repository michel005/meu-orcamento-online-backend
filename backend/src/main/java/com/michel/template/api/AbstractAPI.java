package com.michel.template.api;

import com.michel.template.entity.User;
import com.michel.template.entity.UserAbstractEntity;
import com.michel.template.repository.MongoUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public abstract class AbstractAPI <E extends UserAbstractEntity, R extends MongoUserRepository<E>> {

    @Autowired
    protected AuthenticationService authService;

    @Autowired
    protected R repo;

    public void beforeCreate(E entity) {
    }

    @PostMapping
    public ResponseEntity<E> create(@RequestBody E entity, Authentication auth) {
        beforeCreate(entity);
        User user = authService.getUser(auth);
        entity.setId(UUID.randomUUID());
        entity.setUser(user);
        entity.setCreateDateTime(LocalDateTime.now());
        return ResponseEntity.ok(repo.save(entity));
    }

    public void beforeUpdate(E newEntity, E oldEntity) {
    }

    @PutMapping
    public ResponseEntity<E> update(@RequestBody E entity, Authentication auth) {
        User user = authService.getUser(auth);

        Optional<E> optional = repo.findById(entity.getId());
        if (optional.isPresent()) {
            beforeUpdate(entity, optional.get());
            optional.get().merge(entity);
            return ResponseEntity.ok(repo.save(optional.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public void beforeDelete(E entity) {
    }

    @DeleteMapping
    public ResponseEntity<E> delete(@RequestParam("id") UUID id, Authentication auth) {
        User user = authService.getUser(auth);

        Optional<E> optional = repo.findById(id);
        if (optional.isPresent()) {
            beforeDelete(optional.get());
            repo.delete(optional.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<E>> findAll(Authentication auth) {
        User user = authService.getUser(auth);
        return ResponseEntity.ok(repo.findByUser(user.getId()));
    }

}
