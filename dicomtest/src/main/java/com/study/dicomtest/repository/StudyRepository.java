package com.study.dicomtest.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    
	List<Study> findByPid(String pid); // 환자 ID로 검색
	
	@Query("SELECT s FROM Study s WHERE s.pName LIKE %:name%")
	List<Study> searchByPatientName(@Param("name") String name);
    
}
