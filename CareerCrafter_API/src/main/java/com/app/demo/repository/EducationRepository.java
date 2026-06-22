package com.app.demo.repository;

import com.app.demo.model.Education;
import com.app.demo.model.JobSeeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education,Integer> {
    @Query("""
    select e from Education e where e.jobSeeker.id=?1
    """)
    Page<Education> findByUserId(int id, Pageable pageable);

    long countByJobSeeker(JobSeeker jobSeeker);
}
