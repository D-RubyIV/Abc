package com.example.demo.Service;

import com.example.demo.Domain.ClassDomain;
import com.example.demo.Dto.ClassDto;
import com.example.demo.Repository.ClassRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {
    @Autowired
    private ClassRepository classRepository;

    public ClassDomain add(ClassDto entity){
        ClassDomain domain = new ClassDomain();;
        BeanUtils.copyProperties(entity, domain);
        return classRepository.save(domain);
    }
    public List<ClassDomain> findAll(){
        return classRepository.findAll();
    }

}
