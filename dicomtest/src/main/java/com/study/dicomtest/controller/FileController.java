//package com.study.dicomtest.controller;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.UrlResource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.net.MalformedURLException;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//@Controller
//public class FileController {
//
//	@GetMapping("/dicom-file/{filename}")
//	public ResponseEntity<Resource> getImage(@PathVariable("filename") String filename) throws MalformedURLException {
//	    // 실제 파일 시스템 경로
//	    Path filePath = Paths.get("C:/Users/TJ/Desktop/PACSStorage/").resolve(filename);
//	    Resource resource = new UrlResource(filePath.toUri());
//
//	    if (resource.exists() && resource.isReadable()) {
//	        // 파일이 있으면 HTTP 응답으로 제공
//	        return ResponseEntity.ok()
//	                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//	                .body(resource);
//	    } else {
//	        // 파일이 없을 경우 404 응답
//	        return ResponseEntity.notFound().build();
//	    }
//    }
//}
