package com.example.demo.Domain;

import jakarta.persistence.Entity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Tbl_Role")
public class RoleDomain extends BaseDomain{
    private String name;
    private String code;
}
