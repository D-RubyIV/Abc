package com.example.demo.Controller;

import com.example.demo.Domain.ClassDomain;
import com.example.demo.Domain.LicenseDomain;
import com.example.demo.Dto.ClassDto;
import com.example.demo.Dto.LicenseDto;
import com.example.demo.Exception.CustomException;
import com.example.demo.Repository.ClassRepository;
import com.example.demo.Repository.LicenseRepository;
import com.example.demo.Response.ResponseHandler;
import com.example.demo.Service.LicenseService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController()
@RequestMapping("/api")
public class LicenseController {
    @Autowired
    private LicenseService licenseService;
    @Autowired
    private LicenseRepository licenseRepository;
    @Autowired
    private ClassRepository classRepository;

    @GetMapping("/license")
    private ResponseEntity<?> findAll(){
        return ResponseHandler.responseBuilder(0, HttpStatus.OK, licenseService.findAll());
    }

    @GetMapping("/license/{id}")
    public ResponseEntity<?> detail(@PathVariable(value = "id") Long id) {
        // CHECK TON TAI
        licenseRepository.findById(id).orElseThrow(() -> new CustomException.NotFoundException("License not found"));
        return ResponseHandler.responseBuilder(0, HttpStatus.OK, licenseRepository.findById(id));
    }

    @PostMapping("/license")
    private ResponseEntity<?> add(@Valid @RequestBody LicenseDto dto, BindingResult bindingResult){
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, bindingResult.getAllErrors());
        } else {
            // CHECK TON TAI
            classRepository.findById(dto.getClassDomain().getId()).orElseThrow(() -> new CustomException.NotFoundException("Class Not found"));
            LicenseDomain licenseDomain = new LicenseDomain();
            BeanUtils.copyProperties(dto, licenseDomain);
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, licenseRepository.save(licenseDomain));
        }
    }

    @PutMapping("/license/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") Long id, @Valid @RequestBody LicenseDto dto, BindingResult bindingResult) {
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, bindingResult.getAllErrors());
        } else {
            // CHECK TON TAI
            LicenseDomain licenseDomain = licenseRepository.findById(id).orElseThrow(() -> new CustomException.NotFoundException("Not found License"));
            ClassDomain classDomain = classRepository.findById(dto.getClassDomain().getId()).orElseThrow(() -> new CustomException.NotFoundException("Not Found Class"));
            licenseDomain.setLicenseKey(dto.getLicenseKey());
            licenseDomain.setClassDomain(classDomain);
            licenseDomain.setEnable(dto.isEnable());
            licenseDomain.setRegistrationTime(dto.getRegistrationTime());
            licenseDomain.setExpirationTime(dto.getExpirationTime()
            );
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, licenseRepository.save(licenseDomain));
        }
    }

}
