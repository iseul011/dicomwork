package com.study.dicomtest.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    
}
