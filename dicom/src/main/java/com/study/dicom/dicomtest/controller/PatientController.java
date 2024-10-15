package com.study.dicom.dicomtest.controller;

import java.util.List;

import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // 여기를 수정
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.study.dicom.dicomtest.domain.Image;
import com.study.dicom.dicomtest.domain.Patient;
import com.study.dicom.dicomtest.repository.ImageRepository;
import com.study.dicom.dicomtest.repository.PatientRepository;


@Controller
public class PatientController {

    @AutoConfigureOrder
    private PatientRepository patientRepository;

    @AutoConfigureOrder
    private ImageRepository imageRepository;

    // 환자 목록 페이지
    @GetMapping("/patients")
    public String listPatients(Model model) {
    	// 환자 목록 가져오기
        List<Patient> patients = patientRepository.findAll();
        // 모델에 환자 목록 추가
        model.addAttribute("patients", patients);
        return "patientList"; // 환자 목록을 표시하는 HTML 파일
    }

    // 선택된 환자의 이미지 페이지
    @GetMapping("/patient/{pid}/images")
    public String patientImages(@PathVariable("pid") String pid, Model model) {
        List<Image> images = imageRepository.findByPatientId(pid);
        model.addAttribute("images", images);
        return "patientImages"; // 환자의 이미지를 표시하는 HTML 파일
    }
}
