package com.aversi.domain.entities;

public class User {

    private String id;
    private String name;
    private final String cpf;
    private String email;
    private String password;

    
    public User(String id, String name, String cpf, String email, String password) {
        if (cpf == null || !cpf.matches("\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}")) {
            throw new IllegalArgumentException("CPF fora do padrão");
        }
        if(email == null ||!email.matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")){
            throw new IllegalArgumentException("Email fora do padrão");
        }

        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }

    


    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCpf() {
        return cpf;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
   
    
}
