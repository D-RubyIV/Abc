package com.example.demo.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Tbl_License")
public class LicenseDomain extends BaseDomain{
    private String licenseKey;
    private boolean enable;
    private Long registrationTime;
    private Long expirationTime;
    @ManyToOne
    @JoinColumn(name = "idDomain", referencedColumnName = "id")
    private ClassDomain classDomain;
}
