package com.study.dicom.dicomtest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.dicom.dicomtest.domain.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPatientId(String pid);
}
