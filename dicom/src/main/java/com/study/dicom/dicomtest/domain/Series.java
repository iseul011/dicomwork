package com.study.dicom.dicomtest.domain;

import lombok.*;

import jakarta.persistence.*;

@Table(
        name="SERIESTAB"
)
@Entity
@Getter
@Setter
public class Series {

    private int studykey;
    @Id
    private int serieskey;
    private String studyinsuid;
    private String seriesinsuid;
    private Integer seriesnum;
    private Integer seriescurseqnum;
    private String studyid;
    private String modality;
    private String bodypart;
    private String seriesdesc;
    private String protocolname;
    private String viewposition;
    private String laterality;
    private String comments;
    private Integer imagecnt;
    private Integer moviecnt;
    private String seriestype;
    private Integer verifyflag;
    private Integer delflag;
    private String seriesdate;
    private String seriestime;
    private String insertdate;
    private String inserttime;
    private Integer hospitalid;
    private String performingphysicianname;
    private String operatorsname;
    private String patposition;
    private String anatomicalorientationtype;
    private String manufacturer;
    private String institutionname;
    private String stationname;
    private String institutionaldepartmentname;
    private String manumodelname;
    private Integer nonimagecount;
    private Integer filesize;
    private String inserted;
    private String updated;
    private Integer reserved1;
    private Integer reserved2;
    private Integer reserved3;
    private String reserved4;
    private String reserved5;
    private String reserved6;
    private String reserved7;
    private String reserved8;
    private String reserved9;
    private String reserved10;
}
