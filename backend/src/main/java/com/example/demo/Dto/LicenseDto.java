package com.example.demo.Dto;

import com.example.demo.Domain.ClassDomain;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LicenseDto {
    @NotNull(message = "LicenseKey is required")
    private String licenseKey;
    @NotNull(message = "Enable is required")
    private boolean enable;
    @NotNull(message = "Registration Time is required")
    private Long registrationTime;
    @NotNull(message = "Expiration Time is required")
    private Long expirationTime;
    @NotNull(message = "Class is required")
    private ClassDomain classDomain;
}
