package com.example.demo.Repository;

import com.example.demo.Domain.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDomain, Long> {
    UserDomain findByUsername(String username);
    UserDomain findByEmail(String email);
    UserDomain findByPhone(String phone);
}
