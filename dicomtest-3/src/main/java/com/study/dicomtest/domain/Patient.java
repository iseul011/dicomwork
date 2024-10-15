package com.study.dicomtest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PATIENTTAB")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @Column(name = "PID", length = 64)
    private String pid;  // 환자 ID (Primary Key)

    @Column(name = "PNAME", length = 64, nullable = false)
    private String pname;  // 환자 이름

    @Column(name = "PATKEY", length = 64)
    private String patKey;  // 환자 키

    @Column(name = "PATIENTKEY")
    private Long patientKey;  // 환자 키 (숫자)

    @Column(name = "PLASTNAME", length = 64)
    private String plastName;  // 환자 성

    @Column(name = "PFIRSTNAME", length = 64)
    private String pfirstName;  // 환자 이름

    @Column(name = "PSEX", length = 2)
    private String psex;  // 성별

    @Column(name = "PBIRTHDATE", length = 8)
    private String pbirthDate;  // 생년월일

    @Column(name = "PBIRTHTIME", length = 8)
    private String pbirthTime;  // 출생 시간

    @Column(name = "COMMENTS", length = 64)
    private String comments;  // 코멘트

    @Column(name = "INSERTDATE", length = 8)
    private String insertDate;  // 등록 날짜

    @Column(name = "INSERTTIME", length = 8)
    private String insertTime;  // 등록 시간

    @Column(name = "HOSPITALID", columnDefinition = "NUMBER DEFAULT 0")
    private Long hospitalId;  // 병원 ID

    @Column(name = "PKNAME", length = 64)
    private String pkName;  // 환자 키 이름

    @Column(name = "PENAME", length = 64)
    private String peName;  // 환자 이름 (다른 언어?)

    @Column(name = "INSNAME", length = 255)
    private String insName;  // 보험 이름

    @Column(name = "DELFLAG")
    private Integer delFlag;  // 삭제 플래그

    @Column(name = "INSERTED", length = 14)
    private String inserted;  // 삽입된 시간

    @Column(name = "UPDATED", length = 14)
    private String updated;  // 업데이트된 시간

    @Column(name = "RESERVED1")
    private Integer reserved1;  // 예약 필드 1

    @Column(name = "RESERVED2")
    private Integer reserved2;  // 예약 필드 2

    @Column(name = "RESERVED3")
    private Integer reserved3;  // 예약 필드 3

    @Column(name = "RESERVED4", length = 255)
    private String reserved4;  // 예약 필드 4

    @Column(name = "RESERVED5", length = 255)
    private String reserved5;  // 예약 필드 5

    @Column(name = "RESERVED6", length = 255)
    private String reserved6;  // 예약 필드 6

    @Column(name = "RESERVED7", length = 255)
    private String reserved7;  // 예약 필드 7

    @Column(name = "RESERVED8", length = 255)
    private String reserved8;  // 예약 필드 8

    @Column(name = "RESERVED9", length = 255)
    private String reserved9;  // 예약 필드 9

    @Column(name = "RESERVED10", length = 255)
    private String reserved10;  // 예약 필드 10
}
