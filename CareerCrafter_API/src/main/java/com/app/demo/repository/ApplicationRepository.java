package com.app.demo.repository;

import com.app.demo.model.Application;
import com.app.demo.model.Employee;
import com.app.demo.model.JobSeeker;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ApplicationRepository extends JpaRepository<Application,Integer> {

    @Query("""
    Select a from Application a where a.jobSeeker.id=?1
    """)
    Page<Application> fetchByUserId(int userId,Pageable pageable);

    @Query("""
    Select a from Application a where a.jobPost.id=?1
    """)
    Page<Application> fetchByJobId(int jobId, Pageable pageable);

    Application getByJobPostId(int id);

    long countByJobSeeker(JobSeeker jobSeeker);

    long countByJobPost_Employee(Employee employee);
}
