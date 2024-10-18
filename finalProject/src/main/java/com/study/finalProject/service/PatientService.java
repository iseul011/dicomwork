package com.study.finalProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Patient;
import com.study.finalProject.repository.PatientRepository;


@Service
public class PatientService {

	@Autowired
    private PatientRepository patientRepository;

    

    // 모든 환자 조회
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // 특정 환자 조회
    public Optional<Patient> getPatientById(String pid) {
        return patientRepository.findById(pid);
    }

    // 환자 추가/수정
    public Patient saveOrUpdatePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // 환자 삭제
    public void deletePatient(String pid) {
        patientRepository.deleteById(pid);
    }
}
