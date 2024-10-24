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

    // seriesKey로 첫 번째 이미지 파일 경로를 가져와서 읽기
    public byte[] getFirstImageBySeriesKey(Long seriesKey) {
        // seriesKey에 해당하는 첫 번째 이미지 가져오기
        Optional<Image> firstImage = imageRepository.findFirstBySeriesKeyOrderByInsertDateAsc(seriesKey);

        if (firstImage.isPresent()) {
            // 이미지가 있을 경우, 파일 경로에서 이미지 데이터를 읽어옴
            String imagePath = firstImage.get().getFilePath();  // 이미지 경로를 저장하는 필드 (예시: getFilePath())
            try {
                // 파일 경로에서 byte[] 형태로 이미지 데이터를 읽어옴
                return Files.readAllBytes(Paths.get(imagePath));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;  // 이미지가 없으면 null 반환
    }

}

