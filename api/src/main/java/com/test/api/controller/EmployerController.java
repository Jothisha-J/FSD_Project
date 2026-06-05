package com.test.api.controller;

import com.test.api.model.Employer;
import com.test.api.service.EmployerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class EmployerController {

    private final EmployerService employerService;

    @PostMapping("/api/add/employer")
    public void addEmployee(@RequestParam String cmpny_name, Principal principal) {
        employerService.addEmployee(cmpny_name, principal.getName());
    }

}
