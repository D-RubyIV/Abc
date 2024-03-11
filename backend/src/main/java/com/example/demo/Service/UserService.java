package com.example.demo.Service;

import com.example.demo.Domain.UserDomain;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDomain findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public UserDomain findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public UserDomain findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
    public UserDomain save(UserDomain domain){
        domain.setPassword(passwordEncoder.encode(domain.getPassword()));
        return userRepository.save(domain);
    }
}
