package com.aversi.domain.factories;
import com.aversi.domain.entities.User;
import com.aversi.domain.valueObjects.CPF;
import com.aversi.domain.valueObjects.Email;

public class UserFabrica {

     private User user;

    public User criaUsuario(String id, String firstName, String lastName, String password){
        this.user = new User(id, firstName, lastName, password);
        return this.user;
    }

    public User incluiCpf(String cpf){
        this.user.setCpf(new CPF(cpf));
        return this.user;
    }

    public User incluiEmail(String email){
        this.user.setEmail(new Email(email));
        return this.user;
    }

    
}
