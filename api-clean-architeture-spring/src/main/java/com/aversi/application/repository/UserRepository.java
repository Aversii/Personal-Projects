package com.aversi.application.repository;

import java.util.List;

import com.aversi.domain.entities.User;

public interface UserRepository {
    
    User cadastrarUsuario(User user);
    List<User> listarTodos();
}
