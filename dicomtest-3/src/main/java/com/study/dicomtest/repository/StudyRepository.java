package com.study.dicomtest.repository;

import com.study.dicomtest.domain.Study;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {

}
