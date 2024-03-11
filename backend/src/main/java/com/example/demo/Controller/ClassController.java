package com.example.demo.Controller;

import com.example.demo.Domain.ClassDomain;
import com.example.demo.Dto.ClassDto;
import com.example.demo.Exception.CustomException;
import com.example.demo.Repository.ClassRepository;
import com.example.demo.Response.ResponseHandler;
import com.example.demo.Service.ClassService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ClassController {
    @Autowired
    private ClassService classService;
    @Autowired
    private ClassRepository classRepository;

    @GetMapping("/class")
    public ResponseEntity<?> findAll() {
        return ResponseHandler.responseBuilder(0, HttpStatus.OK, classService.findAll());
    }

    @GetMapping("/class/{id}")
    public ResponseEntity<?> detail(@PathVariable(value = "id") Long id) {
        // CHECK TON TAI
        ClassDomain domain = classRepository.findById(id)
                .orElseThrow(() -> new CustomException.NotFoundException("Not found"));
        return ResponseHandler.responseBuilder(0, HttpStatus.OK, classRepository.findById(id));
    }

    @PostMapping("/class")
    public ResponseEntity<?> add(@Valid @RequestBody ClassDto dto, BindingResult bindingResult) {
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, bindingResult.getAllErrors());
        } else {
            ClassDomain domain = new ClassDomain();
            BeanUtils.copyProperties(dto, domain);
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, classRepository.save(domain));
        }
    }

    @PutMapping("/class/{id}")
    public ResponseEntity<?> update(@PathVariable(value = "id") Long id, @Valid @RequestBody ClassDto dto, BindingResult bindingResult) {
        // CHECK LỖI VALID
        if (bindingResult.hasErrors()) {
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, bindingResult.getAllErrors());
        } else {
            // CHECK TON TAI
            ClassDomain domain = classRepository.findById(id)
                    .orElseThrow(() -> new CustomException.NotFoundException("Not found"));
            domain.setCode(dto.getCode());
            domain.setName(dto.getName());
            return ResponseHandler.responseBuilder(0, HttpStatus.OK, classRepository.save(domain));
        }
    }

    @DeleteMapping("/class/{id}")
    public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) {
        // CHECK TON TAI
        ClassDomain domain = classRepository.findById(id)
                .orElseThrow(() -> new CustomException.NotFoundException("Not found"));
        classRepository.delete(domain);
        return ResponseHandler.responseBuilder(0, HttpStatus.OK, "DELETED");
    }
}
