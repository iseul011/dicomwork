package com.study.dicomtest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.dicomtest.domain.Image;
import com.study.dicomtest.domain.Patient;
import com.study.dicomtest.repository.ImageRepository;
import com.study.dicomtest.repository.PatientRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Controller
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ImageRepository imageRepository;

    // 환자 목록을 가져와 View로 전달
    @GetMapping
    public String listPatients(Model model) {
        List<Patient> patients = patientRepository.findAll();
        model.addAttribute("patients", patients);
        return "patient_list"; // Thymeleaf 템플릿
    }
    
    @GetMapping("/{pid}/images")
    public String getPatientImages(@PathVariable("pid") String patientId, Model model) {
    	// 환자 정보를 가져오기
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("환자를 찾을 수 없습니다."));
        
        // 환자의 이미지 목록을 가져오기
        List<Image> images = imageRepository.findImagesByPatient(patientId);
        
        // 모델에 환자 정보 및 이미지 추가
        model.addAttribute("patient", patient);
        model.addAttribute("images", images);
        
        // 이미지 목록 페이지로 이동
        return "image_list";  // templates/image_list.html 페이지로 이동
    }



    // 실제 이미지 파일을 불러오는 메서드
    @GetMapping("/image/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("C:/Users/TJ/Desktop/PACSStorage").resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
            } else {
                throw new RuntimeException("파일을 읽을 수 없습니다: " + filename);
            }
        } catch (Exception e) {
            throw new RuntimeException("파일을 로드할 수 없습니다: " + filename, e);
        }
    }

}
