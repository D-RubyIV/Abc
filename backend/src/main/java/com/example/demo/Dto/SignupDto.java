package com.example.demo.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SignupDto {
    @NotNull(message = "username is required")
    private String username;
    @NotNull(message = "password is required")
    private String password;
    @NotNull(message = "email is required")
    private String email;
    @NotNull(message = "phone is required")
    private String phone;
    @NotNull(message = "name is required")
    private String name;
}
