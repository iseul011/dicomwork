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
    
    // 환자의 ID로 Study 목록 조회
    public List<Study> getStudiesByPatientId(String patientId) {
        return studyRepository.findByPatientPid(patientId);
    }

    // 환자의 이름으로 Study 목록 조회
    public List<Study> getStudiesByPatientName(String patientName) {
        return studyRepository.findByPatient_pName(patientName);
    }
}