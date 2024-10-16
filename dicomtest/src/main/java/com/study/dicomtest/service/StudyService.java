package com.study.dicomtest.service;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.dicomtest.domain.Series;
import com.study.dicomtest.domain.Study;
import com.study.dicomtest.repository.SeriesRepository;
import com.study.dicomtest.repository.StudyRepository;

@Service
public class StudyService {

    @Autowired
    private StudyRepository studyRepository;
    
    @Autowired
    private SeriesRepository seriesRepository;

    public List<Study> getAllStudies() {
        return studyRepository.findAll();
    }

    public Study getStudyById(Long id) {
        return studyRepository.findById(id).orElse(null);
    }

    public Study saveStudy(Study study) {
        return studyRepository.save(study);
    }

    public void deleteStudy(Long id) {
        studyRepository.deleteById(id);
    }

    public List<Series> getSeriesByStudyKey(Long studyKey) {
        return seriesRepository.findByStudyKey(studyKey);
    
	}
    
    // 환자 ID나 이름으로 Study 목록을 검색하는 메서드 추가
    public List<Study> searchStudies(String searchType, String searchValue) {
        if ("id".equalsIgnoreCase(searchType)) {
            return studyRepository.findByPid(searchValue); // 환자 ID로 검색
        } else if ("name".equalsIgnoreCase(searchType)) {
            return studyRepository.searchByPatientName(searchValue); // 환자 이름으로 검색
        }
        return getAllStudies(); // 검색 조건이 없으면 전체 목록 반환
    }
    
}