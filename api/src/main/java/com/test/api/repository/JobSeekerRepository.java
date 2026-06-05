package com.test.api.repository;

import com.test.api.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface JobSeekerRepository extends JpaRepository<JobSeeker,Integer> {
    @Query("""
    Select j from JobSeeker j where j.user.username=?1
        """)
    Optional<JobSeeker> findByUserName(String username);

}
