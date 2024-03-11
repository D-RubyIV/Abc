package com.example.demo.Service;

import com.example.demo.Domain.LicenseDomain;
import com.example.demo.Dto.LicenseDto;
import com.example.demo.Repository.LicenseRepository;
import com.example.demo.Response.ResponseHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicenseService {
    @Autowired
    private LicenseRepository licenseRepository;
    public List<LicenseDomain> findAll(){
        return licenseRepository.findAll();
    }
}
