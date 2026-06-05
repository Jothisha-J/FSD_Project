package com.test.api.controller;

import com.test.api.dto.JobPage;
import com.test.api.dto.JobPostDto;
import com.test.api.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/api/jobs/add")
    public void addJob(@Valid @RequestBody JobPostDto dto, Principal principal){
         jobService.addJob(dto, principal.getName());
    }

    @GetMapping("/api/jobs/getAll")
    public JobPage getAll(@RequestParam(defaultValue ="0" ,required = false) int page,
                                @RequestParam(defaultValue ="0" ,required = false) int size){
        return jobService.getAll(page,size);
    }

}
