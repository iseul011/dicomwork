package com.study.dicom.dicomtest.domain;

import lombok.*;

import jakarta.persistence.*;

@Table(
        name="IMAGETAB"
)
@Entity
@Getter
@Setter
public class Image {
	@Id
    private Long imagekey; // 이미지 키

    private String sopinstanceuid; // SOP 인스턴스 UID
    private String path; // 이미지 파일 경로
    private String fname; // 이미지 이름

    @ManyToOne
    @JoinColumn(name = "serieskey")
    private Series series;

}
