package com.test.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.test.api.model.*;

import java.util.Optional;


public interface EmployerRepository extends JpaRepository<Employer,Integer> {
    Optional<Employer> findByUserUsername(String name);
}
