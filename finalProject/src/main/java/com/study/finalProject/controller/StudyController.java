package com.study.finalProject.controller;



import java.util.List; // 리스트를 사용하기 위해 필요
//import com.study.dicom.Study; // Study 엔티티 클래스 경로 (패키지명은 실제 프로젝트에 맞게 수정)
//import com.study.dicom.Series; // Series 엔티티 클래스 경로
//import com.study.dicom.Image; // Image 엔티티 클래스 경로

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.study.finalProject.domain.Series;
import com.study.finalProject.domain.Study;
import com.study.finalProject.service.StudyService;



@Controller
public class StudyController {

    @Autowired
    private StudyService studyService;

    
    @GetMapping("/")
    public String home() {
        return "index"; 
    }
    
    @GetMapping("/loginPage")
    public String home1() {
        return "studyList"; 
    }
    
    @GetMapping("/studies")
    public String getAllStudies(Model model) {
        List<Study> studies = studyService.getAllStudies();
        model.addAttribute("studies", studies);  // 'studies' 이름으로 데이터를 모델에 추가
        return "studyList";  // Thymeleaf 템플릿 이름 (study-list.html)
    }
    
    @GetMapping("/studies/search")
    public String searchStudies(@RequestParam("keyword") String keyword, Model model) {
    	List<Study> studies = studyService.searchStudiesByKeyword(keyword);
    	model.addAttribute("studies", studies);
    	return "studyList";
    }
    
    // 특정 Study에 속한 Series 목록을 전달
    @GetMapping("/studies/{studyKey}/series")
    public String listSeries(@PathVariable("studyKey") Long studyKey, Model model) {
        List<Series> seriesList = studyService.getSeriesByStudyKey(studyKey);
        model.addAttribute("series", seriesList);
        return "series";
    }
  

//    // 특정 스터디 상세 페이지
//    @GetMapping("/{studyKey}")
//    public String getStudyById(@PathVariable Long studyKey, Model model) {
//        studyService.getStudyById(studyKey).ifPresent(study -> model.addAttribute("study", study));
//        return "studyDetail"; // 타임리프 템플릿 파일 이름 (studyDetail.html)
//    }

    // 스터디 추가 폼 페이지
    @GetMapping("/studies/new")
    public String createStudyForm(Model model) {
        model.addAttribute("study", new Study());
        return "createStudy"; // 타임리프 템플릿 파일 이름 (createStudy.html)
    }

    // 스터디 추가/수정 처리
    @PostMapping("/studies")
    public String saveOrUpdateStudy(@ModelAttribute Study study) {
        studyService.saveStudy(study);
        return "redirect:/studies";
    }

    // 스터디 삭제
    @PostMapping("/studies/{studyKey}/delete")
    public String deleteStudy(@PathVariable Long studyKey) {
        studyService.deleteStudy(studyKey);
        return "redirect:/studies";
    }
    
    
}