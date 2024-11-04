package com.study.dicomtest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.study.dicomtest.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

	List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey);
	
}
