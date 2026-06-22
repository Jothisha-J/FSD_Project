package com.app.demo.repository;

import com.app.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    @Query("""
    select e from Employee e where e.user.username=?1
        """)
    Employee findByLoginUsername(String username);

    @Query("""
        select e from Employee e where e.email=?1
        """)
    Employee getByEmail(String email);
}
