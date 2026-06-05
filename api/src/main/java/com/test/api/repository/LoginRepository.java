package com.test.api.repository;

import com.test.api.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login,Integer> {
    Optional<Login> findByUsername(String username);
}
