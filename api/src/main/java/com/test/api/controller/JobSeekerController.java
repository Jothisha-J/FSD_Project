package com.test.api.controller;

import com.test.api.dto.Seekerdto;
import com.test.api.service.JobSeekerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class JobSeekerController {

    private final JobSeekerService jobSeekerService;

    @PostMapping("/api/seeker/add")
    public void add(@Valid @RequestBody Seekerdto dto, Principal principal){

        jobSeekerService.add(dto,principal.getName());

    }

}
