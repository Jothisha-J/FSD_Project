package com.app.demo.repository;

import com.app.demo.model.Experience;
import java.util.*;

import com.app.demo.model.JobSeeker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExperienceRepository extends JpaRepository<Experience,Integer> {
   @Query("""
   Select e from Experience e where e.jobSeeker.id=?1
   """)
   Page<Experience> getExpByUserId(int id, Pageable pageable);

    long countByJobSeeker(JobSeeker jobSeeker);
}
