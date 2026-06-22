package com.app.demo.repository;

import com.app.demo.model.JobSeeker;
import com.app.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {


    Optional<User> findByUsername(String username);

}
