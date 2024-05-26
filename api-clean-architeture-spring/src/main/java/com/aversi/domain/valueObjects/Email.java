package com.aversi.domain.valueObjects;

import java.util.Objects;

public class Email {
    private final String email;

    public Email(String email) {
        if (email == null || !email.matches("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$")) {
            throw new IllegalArgumentException("Endereço de email inválido");
        }
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Email email = (Email) o;
        return email.equals(email.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}

