package com.study.dicomtest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SERIESTAB")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Series {

    @Id
    @Column(name = "SERIESKEY", precision = 19, scale = 2)
    private Long seriesKey;  // 시리즈 키 (Primary Key 중 하나)
    
    @ManyToOne
    @JoinColumn(name = "STUDYKEY", nullable = false)
    private Study study;

//    @Column(name = "STUDYKEY", nullable = false)
//    private Long studyKey;  // 스터디 키 (Primary Key 중 하나)

    @Column(name = "STUDYINSUID", length = 64, nullable = false)
    private String studyInsUid;  // 스터디 인스턴스 UID

    @Column(name = "SERIESINSUID", length = 64, nullable = false)
    private String seriesInsUid;  // 시리즈 인스턴스 UID

    @Column(name = "SERIESNUM")
    private Long seriesNum;  // 시리즈 번호

    @Column(name = "SERIESCURSEQNUM")
    private Long seriesCurSeqNum;  // 시리즈 현재 시퀀스 번호

    @Column(name = "STUDYID", length = 64)
    private String studyId;  // 스터디 ID

    @Column(name = "MODALITY", length = 16)
    private String modality;  // 모달리티

    @Column(name = "BODYPART", length = 256)
    private String bodyPart;  // 신체 부위

    @Column(name = "SERIESDESC", length = 256)
    private String seriesDesc;  // 시리즈 설명

    @Column(name = "PROTOCOLNAME", length = 64)
    private String protocolName;  // 프로토콜 이름

    @Column(name = "VIEWPOSITION", length = 255)
    private String viewPosition;  // 뷰 포지션

    @Column(name = "LATERALITY", length = 64)
    private String laterality;  // 좌우측 정보

    @Column(name = "COMMENTS", length = 255)
    private String comments;  // 코멘트

    @Column(name = "IMAGECNT")
    private Long imageCnt;  // 이미지 수

    @Column(name = "MOVIECNT")
    private Long movieCnt;  // 동영상 수

    @Column(name = "SERIESTYPE", length = 64)
    private String seriesType;  // 시리즈 타입

    @Column(name = "VERIFYFLAG")
    private Long verifyFlag;  // 검증 플래그

    @Column(name = "DELFLAG")
    private Long delFlag;  // 삭제 플래그

    @Column(name = "SERIESDATE", length = 8)
    private String seriesDate;  // 시리즈 날짜

    @Column(name = "SERIESTIME", length = 14)
    private String seriesTime;  // 시리즈 시간

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;  // 삽입 날짜

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;  // 삽입 시간

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER DEFAULT 0")
    private Long hospitalId;  // 병원 ID

    @Column(name = "PERFORMINGPHYSICIANNAME", length = 64)
    private String performingPhysicianName;  // 담당 의사 이름

    @Column(name = "OPERATORSNAME", length = 64)
    private String operatorsName;  // 작업자 이름

    @Column(name = "PATPOSITION", length = 64)
    private String patPosition;  // 환자 위치

    @Column(name = "ANATOMICALORIENTATIONTYPE", length = 64)
    private String anatomicalOrientationType;  // 해부학적 위치

    @Column(name = "MANUFACTURER", length = 64)
    private String manufacturer;  // 제조사

    @Column(name = "INSTITUTIONNAME", length = 256)
    private String institutionName;  // 기관명

    @Column(name = "STATIONNAME", length = 64)
    private String stationName;  // 스테이션명

    @Column(name = "INSTITUTIONALDEPARTMENTNAME", length = 64)
    private String institutionalDepartmentName;  // 부서명

    @Column(name = "MANUMODELNAME", length = 64)
    private String manuModelName;  // 모델명

    @Column(name = "NONIMAGECOUNT")
    private Long nonImageCount;  // 이미지가 아닌 파일 수

    @Column(name = "FILESIZE")
    private Long fileSize;  // 파일 크기

    @Column(name = "INSERTED", length = 14)
    private String inserted;  // 삽입된 시간

    @Column(name = "UPDATED", length = 14)
    private String updated;  // 업데이트된 시간

    @Column(name = "RESERVED1")
    private Long reserved1;  // 예약된 필드 1

    @Column(name = "RESERVED2")
    private Long reserved2;  // 예약된 필드 2

    @Column(name = "RESERVED3")
    private Long reserved3;  // 예약된 필드 3

    @Column(name = "RESERVED4", length = 255)
    private String reserved4;  // 예약된 필드 4

    @Column(name = "RESERVED5", length = 255)
    private String reserved5;  // 예약된 필드 5

    @Column(name = "RESERVED6", length = 255)
    private String reserved6;  // 예약된 필드 6

    @Column(name = "RESERVED7", length = 255)
    private String reserved7;  // 예약된 필드 7

    @Column(name = "RESERVED8", length = 255)
    private String reserved8;  // 예약된 필드 8

    @Column(name = "RESERVED9", length = 255)
    private String reserved9;  // 예약된 필드 9

    @Column(name = "RESERVED10", length = 255)
    private String reserved10;  // 예약된 필드 10

    @Column(name = "ANATOMICAL_ORIENTATION_TYPE", length = 255)
    private String anatomicalOrientationTypeExtended;  // 해부학적 위치 확장 필드

    @Column(name = "BODY_PART", length = 255)
    private String bodyPartExtended;  // 신체 부위 확장 필드

    @Column(name = "INSERT_DATE", length = 255)
    private String insertDateExtended;  // 삽입 날짜 확장 필드

    @Column(name = "INSERT_TIME", length = 255)
    private String insertTimeExtended;  // 삽입 시간 확장 필드

    @Column(name = "INSTITUTION_NAME", length = 255)
    private String institutionNameExtended;  // 기관명 확장 필드

    @Column(name = "INSTITUTIONAL_DEPARTMENT_NAME", length = 255)
    private String institutionalDepartmentNameExtended;  // 부서명 확장 필드

    @Column(name = "MANU_MODEL_NAME", length = 255)
    private String manuModelNameExtended;  // 모델명 확장 필드

    @Column(name = "OPERATORS_NAME", length = 255)
    private String operatorsNameExtended;  // 작업자 이름 확장 필드

    @Column(name = "PAT_POSITION", length = 255)
    private String patPositionExtended;  // 환자 위치 확장 필드

    @Column(name = "PERFORMING_PHYSICIAN_NAME", length = 255)
    private String performingPhysicianNameExtended;  // 담당 의사 이름 확장 필드

    @Column(name = "PROTOCOL_NAME", length = 255)
    private String protocolNameExtended;  // 프로토콜 이름 확장 필드

    @Column(name = "SERIES_DATE", length = 255)
    private String seriesDateExtended;  // 시리즈 날짜 확장 필드

    @Column(name = "SERIES_DESC", length = 255)
    private String seriesDescExtended;  // 시리즈 설명 확장 필드

    @Column(name = "SERIES_INS_UID", length = 255)
    private String seriesInsUidExtended;  // 시리즈 인스턴스 UID 확장 필드

    @Column(name = "SERIES_TIME", length = 255)
    private String seriesTimeExtended;  // 시리즈 시간 확장 필드

    @Column(name = "SERIES_TYPE", length = 255)
    private String seriesTypeExtended;  // 시리즈 타입 확장 필드

    @Column(name = "STATION_NAME", length = 255)
    private String stationNameExtended;  // 스테이션명 확장 필드

    @Column(name = "STUDY_ID", length = 255)
    private String studyIdExtended;  // 스터디 ID 확장 필드

    @Column(name = "STUDY_INS_UID", length = 255)
    private String studyInsUidExtended;  // 스터디 인스턴스 UID 확장 필드

    @Column(name = "VIEW_POSITION", length = 255)
    private String viewPositionExtended;  // 뷰 포지션 확장 필드
}
