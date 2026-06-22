package com.app.demo.controller;

import com.app.demo.DTO.ExperienceDTO;
import com.app.demo.DTO.ExperiencePage;
import com.app.demo.service.ExperienceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/experience")
@CrossOrigin(origins = "http://localhost:5173")

public class ExperienceController {

    private final ExperienceService experienceService;
    //add new experience
    @PostMapping("/add")
    public void addExp(@Valid @RequestBody ExperienceDTO experienceDTO, Principal principal) {
        experienceService.addExp(experienceDTO, principal.getName());
    }

    //fetch experiences of logged user
    @GetMapping("/my-experiences")
    public ExperiencePage getMyExperiences(Principal principal,
                                           @RequestParam(defaultValue = "0", required = false) int page,
                                           @RequestParam(defaultValue = "10", required = false) int size) {
        return experienceService.getMyExperiences(principal.getName(),page,size);
    }

    //update experience
    @PutMapping("/update/{expId}")
    public void updateExperience(@Valid @RequestBody ExperienceDTO experienceDTO,
            @PathVariable int expId, Principal principal) {
        experienceService.updateExp(experienceDTO, expId, principal.getName());
    }

    //delete experience
    @DeleteMapping("/delete/{expId}")
    public void deleteExp(@PathVariable int expId, Principal principal) {
        experienceService.deleteExp(expId, principal.getName());
    }
}