package com.example.demo.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "Tbl_user")
public class UserDomain extends BaseDomain implements UserDetails {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String name;
    private float balance;
    private boolean enable;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<RoleDomain> listRole;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return listRole.stream().map(s -> new SimpleGrantedAuthority(s.getCode())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enable;
    }
}
