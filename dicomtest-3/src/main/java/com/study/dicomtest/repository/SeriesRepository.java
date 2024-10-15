package com.study.dicomtest.repository;

import com.study.dicomtest.domain.Series;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {

}
