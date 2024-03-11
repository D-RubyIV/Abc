package com.example.demo.Controller;

import com.example.demo.Config.jwt.JwtService;
import com.example.demo.Domain.UserDomain;
import com.example.demo.Dto.LoginDto;
import com.example.demo.Dto.SignupDto;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Response.ResponseHandler;
import com.example.demo.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto dto, BindingResult bindingResult) {
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        } else {
            UserDomain domain = userService.findByUsername(dto.getUsername());
            // NẾU CÓ TỒN TẠI USER
            if (domain == null) {
                return ResponseHandler.responseBuilder(1, HttpStatus.BAD_REQUEST, "Username not found");
            }
            // NẾU KO TỒN TẠI USER
            else {
                // NẾU PASSWORD ĐÚNG
                if (passwordEncoder.matches(dto.getPassword(), domain.getPassword())) {
                    String accessToken = jwtService.createAccessToken(domain);
                    String refreshToken = jwtService.creatRefreshToken(domain);
                    Map<String, String> map = new HashMap<>();
                    map.put("accessToken", accessToken);
                    map.put("refreshToken", refreshToken);
                    return ResponseHandler.responseBuilder(0, HttpStatus.OK, map);
                }
                // NẾU PASSWORD SAI
                else {
                    return ResponseHandler.responseBuilder(1, HttpStatus.BAD_REQUEST, "Username or password not correct");
                }
            }
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDto dto, BindingResult bindingResult){
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors().stream().map(s -> s.getDefaultMessage()), HttpStatus.BAD_REQUEST);
        }else{
            UserDomain domainByEmail = userService.findByEmail(dto.getEmail());
            if (domainByEmail != null){
                return ResponseHandler.responseBuilder(1, HttpStatus.BAD_REQUEST, "Email is already used");
            }
            UserDomain domainByPhone = userService.findByPhone(dto.getPhone());
            if (domainByPhone != null){
                return ResponseHandler.responseBuilder(1, HttpStatus.BAD_REQUEST, "Phone is already used");
            }
            UserDomain domainByUsername = userService.findByUsername(dto.getUsername());
            if (domainByUsername != null){
                return ResponseHandler.responseBuilder(1, HttpStatus.BAD_REQUEST, "Username is already used");
            }
            UserDomain domain = new UserDomain();
            BeanUtils.copyProperties(dto, domain);
            domain.setEnable(true);
            domain.setBalance(0);
            domain.setListRole(Set.of(roleRepository.findByCode("ROLE_USER")));
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, userService.save(domain));
        }

    }

}
