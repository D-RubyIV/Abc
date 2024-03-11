package com.example.demo;

import com.example.demo.Domain.ClassDomain;
import com.example.demo.Domain.LicenseDomain;
import com.example.demo.Domain.RoleDomain;
import com.example.demo.Domain.UserDomain;
import com.example.demo.Repository.ClassRepository;
import com.example.demo.Repository.LicenseRepository;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;

@Component
public class initDataBase {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init(){
        if (roleRepository.findByCode("ROLE_ADMIN") == null){
            RoleDomain roleEntity = new RoleDomain();
            roleEntity.setCode("ROLE_ADMIN");
            roleRepository.save(roleEntity);
        }
        if (roleRepository.findByCode("ROLE_USER") == null){
            RoleDomain roleEntity = new RoleDomain();
            roleEntity.setCode("ROLE_USER");
            roleRepository.save(roleEntity);
        }
        if (userRepository.findByUsername("admin") == null){
            UserDomain userEntity = new UserDomain();
            userEntity.setUsername("admin");
            userEntity.setPassword(passwordEncoder.encode("123456"));
            userEntity.setEmail("phamhaanh2k4.php@gmail.com");
            userEntity.setPhone("0833486936");
            userEntity.setName("Pham Ha Anh");
            userEntity.setEnable(true);
            userEntity.setListRole(Set.of(roleRepository.findByCode("ROLE_ADMIN")));
            userRepository.save(userEntity);
        }
        if (roleRepository.findByCode("ROLE_USER") == null){
            RoleDomain roleEntity = new RoleDomain();
            roleEntity.setCode("ROLE_USER");
            roleRepository.save(roleEntity);
        }
        if (classRepository.findByCode("HYPERTELE") == null){
            ClassDomain domain = new ClassDomain();
            domain.setName("HyperTele");
            domain.setCode("HYPERTELE");
            classRepository.save(domain);
        }
        if (classRepository.findByCode("CYPERSOFT") == null){
            ClassDomain domain = new ClassDomain();
            domain.setName("CyperSoft");
            domain.setCode("CYPERSOFT");
            classRepository.save(domain);
        }
        if (licenseRepository.findByLicenseKey("[00331-10000-00001-AA698][TQ4W#!R4H7G3H3Z4S5PI4V#!CQ4KE2NSHH#WZENOOS3KWZJFRLJQ]") == null){
            LicenseDomain licenseDomain = new LicenseDomain();
            licenseDomain.setLicenseKey("[00331-10000-00001-AA698][TQ4W#!R4H7G3H3Z4S5PI4V#!CQ4KE2NSHH#WZENOOS3KWZJFRLJQ]");
            licenseDomain.setExpirationTime(new Timestamp(new Date().getTime()).getTime());
            licenseDomain.setRegistrationTime(new Timestamp(new Date().getTime()).getTime());
            licenseDomain.setEnable(true);
            licenseDomain.setClassDomain(classRepository.findByCode("HYPERTELE"));
            licenseRepository.save(licenseDomain);
        }
        if (licenseRepository.findByLicenseKey("[00356-02664-38781-AAOEM][J4W#Q!FRKKY37W#!F4F#T#PSMC3K#7FC7Z6#62ON##SWFZ4CLM4Q]") == null){
            LicenseDomain licenseDomain = new LicenseDomain();
            licenseDomain.setLicenseKey("[00356-02664-38781-AAOEM][J4W#Q!FRKKY37W#!F4F#T#PSMC3K#7FC7Z6#62ON##SWFZ4CLM4Q]");
            licenseDomain.setExpirationTime(new Timestamp(new Date().getTime()).getTime());
            licenseDomain.setRegistrationTime(new Timestamp(new Date().getTime()).getTime());
            licenseDomain.setEnable(true);
            licenseDomain.setClassDomain(classRepository.findByCode("HYPERTELE"));
            licenseRepository.save(licenseDomain);
        }
    }
}