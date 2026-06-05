package com.test.api.controller;

import com.test.api.dto.ApplicationPage;
import com.test.api.model.Application;
import com.test.api.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/api/application/add/{jobId}")
    public void add(@PathVariable int jobId, Principal principal){
        applicationService.addApplication(jobId,principal.getName());
    }

    @GetMapping("/api/application/getAll")
    public ApplicationPage getAll(@RequestParam(defaultValue ="0" ,required = false) int page,
                                  @RequestParam(defaultValue ="0" ,required = false) int size){
        return applicationService.getAll(page,size);
    }

}
