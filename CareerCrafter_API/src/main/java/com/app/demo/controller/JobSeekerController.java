package com.app.demo.controller;

import com.app.demo.DTO.JobSeekerDTO;
import com.app.demo.DTO.JobSeekerPage;
import com.app.demo.DTO.JobSeekerStatsDTO;
import com.app.demo.model.JobSeeker;
import com.app.demo.service.JobSeekerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class JobSeekerController {

    private final JobSeekerService jobSeekerService;

    //add new profile
    @PostMapping("/add")
    public void setUserProfile(@RequestBody JobSeekerDTO jobSeeker, Principal principal) {
        jobSeekerService.setUserProfile(jobSeeker, principal.getName());
    }

    //fetch user profile
    @GetMapping("/profile")
    public JobSeeker getProfile(Principal principal) {
        return jobSeekerService.getProfile(principal.getName());
    }

    //fetch all user
    @GetMapping("/getAll")
    public JobSeekerPage getAll(@RequestParam(defaultValue = "0", required = false) int page,
                                @RequestParam(defaultValue = "10", required = false) int size) {
        return jobSeekerService.getAll(page,size);
    }

    //update profile
    @PutMapping("/update")
    public void update(@RequestBody JobSeekerDTO jobSeeker, Principal principal) {
        jobSeekerService.update(jobSeeker, principal.getName());
    }

    @GetMapping("/all")
    public List<JobSeekerDTO> getAllJobSeekers() {
        return jobSeekerService.getAllJobSeekers();
    }

    @GetMapping("/stats")
    public JobSeekerStatsDTO getStats(Principal principal) {
        return jobSeekerService.getStats(principal.getName());
    }
}