package com.app.demo.repository;

import com.app.demo.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<JobSeeker,Integer> {

    @Query("""
    select u from JobSeeker u where u.user.username=?1
    """)
    Optional<JobSeeker> findByLogin(String username);

    boolean existsByEmail(String email);

    Optional<JobSeeker> findByEmail(String email);
}
