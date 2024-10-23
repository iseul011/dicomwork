package com.study.dicomtest.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.study.dicomtest.domain.Image;
import com.study.dicomtest.service.ImageService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ImageController {

    @Autowired
    ImageService imageService; // ImageService를 통해 데이터베이스 접근

    // 스터디키와 시리즈키를 사용해 데이터베이스에서 이미지 경로와 파일 이름을 조회
    @GetMapping("/studies/{studyKey}/series/{seriesKey}/images")
    public String getImagesByStudyKeyAndSeriesKey(@PathVariable("studyKey") Long studyKey,
                                                  @PathVariable("seriesKey") Long seriesKey,
                                                  Model model) {
        // 데이터베이스에서 이미지 정보 조회
        List<Image> images = imageService.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);

        if (images != null && !images.isEmpty()) {
            List<String> imagePaths = new ArrayList<>();

            // 각 이미지의 경로와 파일명을 결합하여 리스트에 추가
            for (Image image : images) {
                // 데이터베이스에서 가져온 path와 fname을 합쳐서 서버의 경로를 구성
            	String fullPath = Paths.get(image.getPath(), image.getFName()).toString().replace("\\", "/"); // 경로와 파일 이름을 결합
                imagePaths.add(fullPath); // 전체 경로를 추가
            }
            System.out.println("이미지 경로+이름 리스트 imagePaths: " + imagePaths);
            // 모델에 이미지 경로 리스트 추가
            model.addAttribute("imagePaths", imagePaths);
            return "images"; // 이미지 뷰 페이지로 이동
        } else {
            return "errorView"; // 이미지가 없을 경우 에러 페이지로 이동
        }
    }

    // 이미지 파일을 제공하는 메서드: 파일 시스템에서 파일을 찾아서 클라이언트에 제공
    @GetMapping("/dicom-file/**")
    public ResponseEntity<Resource> getImage(HttpServletRequest request) throws MalformedURLException {
        // 경로 얻어오기 ("/dicom-file/" 이후 경로)
        String fullPath = request.getRequestURI().replace("/dicom-file/", "");
        Path filePath = Paths.get("C:/Users/TJ/Desktop/PACSStorage/", fullPath); // PACSStorage 경로와 결합
        Resource resource = new UrlResource(filePath.toUri());

        System.out.println("생성된 파일 경로: " + filePath.toString()); // 경로 확인 로그

        if (resource.exists() && resource.isReadable()) {
            // 파일이 존재하면 HTTP 응답으로 파일 제공
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            // 파일이 없을 경우 404 에러
            System.out.println("파일을 찾을 수 없습니다: " + filePath.toString());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/dicom-file/{seriesKey}/first-image")
    public ResponseEntity<Resource> getFirstImage(@PathVariable Long seriesKey) {
        System.out.println("Fetching first image for seriesKey: " + seriesKey);
        
        // ImageService를 통해 이미지 가져오기
        byte[] imageData = imageService.getFirstImageBySeriesKey(seriesKey);
        
        if (imageData != null) {
            System.out.println("Successfully retrieved image data for seriesKey: " + seriesKey);
            ByteArrayResource resource = new ByteArrayResource(imageData);
            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
        } else {
            System.out.println("No image found for seriesKey: " + seriesKey);
            return ResponseEntity.notFound().build();
        }
    }

}
