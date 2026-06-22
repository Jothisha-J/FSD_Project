package com.app.demo.controller;

import com.app.demo.DTO.EducationDTO;
import com.app.demo.DTO.EducationPage;
import com.app.demo.model.Education;
import com.app.demo.service.EducationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")

public class EducationController {

    private final EducationService educationService;

    //add a new education for the logged user
    @PostMapping("/add")
    public void addEducation(@Valid @RequestBody EducationDTO education, Principal principal) {
        educationService.addEducation(education, principal.getName());
    }

    //fetch the list of education of the logged user
    @GetMapping("/my-education")
    public EducationPage getEducation(Principal principal,
                                      @RequestParam(defaultValue = "0", required = false) int page,
                                      @RequestParam(defaultValue = "10", required = false) int size) {
        return educationService.getEducation(principal.getName(),page,size);
    }

    //update education details
    @PutMapping("/update/{educationId}")
    public void updateEducation(@Valid @RequestBody Education education,
                                @PathVariable int educationId, Principal principal) {
        educationService.updateEducation(education, educationId, principal.getName()
        );
    }

    //delete an education
    @DeleteMapping("/delete/{educationId}")
    public void deleteEducation(@PathVariable int educationId) {
        educationService.deleteByEdId(educationId);
    }
}