package com.study.dicomtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
}

