package com.example.demo.Repository;

import com.example.demo.Domain.ClassDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<ClassDomain, Long> {
    ClassDomain findByCode(String code);
}
