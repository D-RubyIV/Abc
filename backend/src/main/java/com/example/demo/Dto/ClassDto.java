package com.example.demo.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClassDto {
    @NotNull(message = "name is required")
    private String name;
    @NotNull(message = "code is required")
    private String code;
}
