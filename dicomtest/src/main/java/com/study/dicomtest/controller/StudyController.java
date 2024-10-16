package com.study.dicomtest.controller;

import java.util.List; // 리스트를 사용하기 위해 필요
//import com.study.dicom.Study; // Study 엔티티 클래스 경로 (패키지명은 실제 프로젝트에 맞게 수정)
//import com.study.dicom.Series; // Series 엔티티 클래스 경로
//import com.study.dicom.Image; // Image 엔티티 클래스 경로

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.study.dicomtest.domain.Series;
import com.study.dicomtest.domain.Study;
import com.study.dicomtest.service.StudyService;

@Controller
public class StudyController {

    @Autowired
    private StudyService studyService;

    @GetMapping("/studies")
    public String getAllStudies(
    		@RequestParam(name = "searchType", required = false) String searchType,
    		@RequestParam(name  = "searchValue", required = false) String searchValue,
    		Model model) {
    	
        List<Study> studies;
        
        // 검색 조건이 없거나 비어 있으면 전체 목록을 불러옴
        if (searchType == null || searchType.isEmpty() || searchValue == null || searchValue.isEmpty()) {
            studies = studyService.getAllStudies();
        } else {
            // 검색 조건이 있으면 검색 실행
            studies = studyService.searchStudies(searchType, searchValue);
        }
        
        model.addAttribute("studies", studies);  // 'studies' 이름으로 데이터를 모델에 추가
        model.addAttribute("searchPerformed", true); // 검색이 수행되었음을 명시
        return "studies";  // Thymeleaf 템플릿 이름 (study-list.html)
    }
    
    // 특정 Study에 속한 Series 목록을 전달
    @GetMapping("/studies/{studyKey}/series")
    public String listSeries(@PathVariable("studyKey") Long studyKey, Model model) {
        List<Series> seriesList = studyService.getSeriesByStudyKey(studyKey);
        model.addAttribute("series", seriesList);
        return "series";
    }
}