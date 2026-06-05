package com.test.api.service;

import com.test.api.exception.ResourceNotFoundException;
import com.test.api.model.Employer;
import com.test.api.model.Login;
import com.test.api.repository.EmployerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final LoginService loginService;

    public Employer findEmp(String name) {
            return employerRepository.findByUserUsername(name)
                    .orElseThrow(() -> new ResourceNotFoundException("Employer not found"));
    }

    public void addEmployee(String employer, String name) {
            //fetch login details to validate
            Login login = loginService.getByUsername(name);
            //add login to employee
            Employer employee=new Employer();
            employee.setCompanyName(employer);
            employee.setUser(login);
            //add employee
            employerRepository.save(employee);
        }
    }

