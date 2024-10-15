package com.study.dicomtest.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
	
	// 환자의 ID로 Study 리스트 검색
    List<Study> findByPatientPid(String pid);

    // 환자의 이름으로 Study 리스트 검색
    List<Study> findByPatient_pName(String pName); // underscore를 사용해 patient의 pName 속성에 접근
    
}
