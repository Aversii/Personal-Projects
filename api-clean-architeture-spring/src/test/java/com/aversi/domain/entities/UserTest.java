package com.aversi.domain.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.aversi.domain.factories.UserFabrica;

public class UserTest {    
    
    @Test
    public void ShouldCreateAnUser(){
        User user = new User("1sr1a23-4sb", "João", "Pedrada",  "123456");        
        assertNotNull(user.getFirstName());
        assertEquals("João", user.getFirstName());
        assertEquals("Pedrada", user.getLastName());
        assertEquals("123456", user.getPassword());
    }

    @Test
    public void ShouldNotCreateAnUser(){    
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("1", "ea", "Silva", "senha123"));
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("1", "", "Silva",  "senha123"));
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("1", null, "Silva", "senha123"));
    } 

    @Test
    public void ShouldCreateAnUserFromFactory (){
        UserFabrica fabrica = new UserFabrica();
        User user = fabrica.criaUsuario("1321a23-4sa", "Maria", "Silva", "senha123");
        user = fabrica.incluiCpf("123.456.789-13");
        user = fabrica.incluiEmail("laaiuheiaue@gmail.com");
        Assertions.assertEquals("123.456.789-13",user.getCpf());
        Assertions.assertEquals("laaiuheiaue@gmail.com",user.getEmail());
    }
}
