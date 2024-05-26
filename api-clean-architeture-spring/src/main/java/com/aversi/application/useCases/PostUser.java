package com.aversi.application.useCases;

import com.aversi.application.repository.UserRepository;
import com.aversi.domain.entities.User;

public class PostUser {

    private UserRepository repository;

    public PostUser(UserRepository repositorio) {
        this.repository = repositorio;
    }

     public User cadastrarUsuario(User usuario) {
        return repository.cadastrarUsuario(usuario);
    }
    
}
