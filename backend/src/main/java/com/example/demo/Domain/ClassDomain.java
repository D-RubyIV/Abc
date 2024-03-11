package com.example.demo.Domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Tbl_Class")
@Table(name = "Tbl_Class")
public class ClassDomain extends BaseDomain{
    private String name;
    private String code;
//    @OneToMany(mappedBy="classDomain", cascade = CascadeType.ALL)
//    private Set<LicenseDomain> licenses;
}
