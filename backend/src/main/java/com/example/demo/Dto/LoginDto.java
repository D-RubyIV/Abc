package com.example.demo.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDto {
    @NotNull(message = "username is required")
    private String username;
    @NotNull(message = "password is required")
    private String password;
}
