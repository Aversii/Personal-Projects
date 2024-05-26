package com.aversi.domain.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UserTest {    
    
    @Test
    public void ShouldCreateAnUser(){

        User validUser = new User("1234asdfr4578","Joao Pedrada","123.679.225-39","asdas@gmail.com","123456");
        User user = new User("1234asdfr4578", "Joao Pedrada", "123.679.225-39", "asdas@gmail.com", "123456");
        
        assertNotNull(user.getId());
        assertEquals("Joao Pedrada", user.getName());
        assertEquals("123.679.225-39", user.getCpf());
        assertEquals("asdas@gmail.com", user.getEmail());
        assertEquals("123456", user.getPassword());
        assertEquals(validUser.getClass(),user.getClass());
    }

    @Test
    public void ShouldNotCreateAnUser(){    
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("3asdasdawer6-v31", "Aversi","383697.466-35", "asdasgmail.com","123456"));
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("3asdasdawer6-v33", "Aversi","", "asdasd@gmail.com","123456"));
        Assertions.assertThrows(IllegalArgumentException.class,
        ()-> new User("3asdasdawer6-v35", "Aversi","asdasdasdasa", "asdasd@gmail.com","123456"));
    }
}
