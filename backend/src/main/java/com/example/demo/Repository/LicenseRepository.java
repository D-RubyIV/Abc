package com.example.demo.Repository;

import com.example.demo.Domain.LicenseDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository extends JpaRepository<LicenseDomain, Long> {
    LicenseDomain findByLicenseKey(String key);
}
