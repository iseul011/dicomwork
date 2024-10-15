package com.study.dicomtest.controller;

import com.study.dicomtest.domain.Image;
import com.study.dicomtest.domain.Patient;
import com.study.dicomtest.repository.ImageRepository;
import com.study.dicomtest.repository.PatientRepository;
import com.study.dicomtest.repository.StudyRepository;
import com.study.dicomtest.repository.SeriesRepository;

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

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private ImageRepository imageRepository;

    // 특정 환자의 모든 이미지 목록을 보여주는 페이지
    @GetMapping("/patient/{pid}")
    public String listImagesByPatient(@PathVariable String pid, Model model) {
        // 환자 정보 확인
        Patient patient = patientRepository.findById(pid).orElse(null);
        if (patient == null) {
            return "error"; // 환자 정보가 없을 경우 에러 페이지
        }

        // Study -> Series -> Image 연관 조회
        List<Image> images = imageRepository.findImagesByPatient(pid);

        model.addAttribute("patient", patient);
        model.addAttribute("images", images);

        return "image_list"; // Thymeleaf 템플릿으로 이미지 리스트 페이지
    }

    // 실제 이미지 파일을 반환하는 메서드
    @GetMapping("/display/{imageId}")
    public ResponseEntity<Resource> displayImage(@PathVariable Long imageId) {
        Image image = imageRepository.findById(imageId).orElse(null);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        // 이미지 경로와 파일명 결합
        Path imagePath = Paths.get("C:/Users/TJ/Desktop/PACSStorage", image.getPath(), image.getFname());
        Resource resource = null;

        try {
            resource = new UrlResource(imagePath.toUri());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
