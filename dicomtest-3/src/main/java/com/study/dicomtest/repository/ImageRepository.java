package com.study.dicomtest.repository;

import com.study.dicomtest.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

	@Query("SELECT i FROM Image i JOIN i.study s WHERE s.patKey = :pid")
	List<Image> findImagesByPatient(@Param("pid") String patientId);
    
}

