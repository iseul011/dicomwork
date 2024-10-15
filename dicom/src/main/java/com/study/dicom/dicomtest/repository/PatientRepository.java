package com.study.dicom.dicomtest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.dicom.dicomtest.domain.Patient;

public interface PatientRepository extends JpaRepository<Patient, String> {
}

