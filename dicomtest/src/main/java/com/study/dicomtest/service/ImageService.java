/*
 * package com.study.dicomtest.service;
 * 
 * import java.util.List;
 * 
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.stereotype.Service;
 * 
 * import com.study.dicomtest.domain.Image; import
 * com.study.dicomtest.repository.ImageRepository;
 * 
 * @Service public class ImageService {
 * 
 * @Autowired ImageRepository imageRepository;
 * 
 * public List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long
 * seriesKey) {
 * 
 * return imageRepository.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
 * }
 * 
 * }
 */

package com.study.dicomtest.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.dicomtest.domain.Image;
import com.study.dicomtest.repository.ImageRepository;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    // studyKey와 seriesKey로 이미지 목록 가져오기
    public List<Image> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey) {
        return imageRepository.getImagesByStudyKeyAndSeriesKey(studyKey, seriesKey);
    }


}

