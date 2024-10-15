package com.study.dicom.dicomtest.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PATIENTTAB")
@Getter
@Setter
public class Patient {
	 @Id
	    private String pid; // 환자 ID
	    
	    private String pname; // 환자 이름
	    private String psex;  // 환자 성별
	    private String pbirthdate; // 환자 생년월일
}
