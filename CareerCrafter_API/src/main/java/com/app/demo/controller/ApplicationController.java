package com.app.demo.controller;

import com.app.demo.DTO.ApplicationDto;
import com.app.demo.DTO.ApplicationPage;
import com.app.demo.enums.Status;
import com.app.demo.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/application")
@CrossOrigin(origins = "http://localhost:5173")

public class ApplicationController {

    private final ApplicationService applicationService;

    //add an new application
    @PostMapping("/add")
    public int addApplication(
            @Valid @RequestBody ApplicationDto applicationDto,
            Principal principal) {

        return applicationService.add(
                applicationDto,
                principal.getName()
        );
    }

    //get the applications of the user logged in
    @GetMapping("/my-applications")
    public ApplicationPage myApplications(Principal principal,
                                          @RequestParam(defaultValue = "0", required = false) int page,
                                          @RequestParam(defaultValue = "10", required = false) int size) {
        return applicationService.fetchMyApplications(principal.getName(),page,size);
    }

    //get the applications coming in for the job post's posted by a particular employee
    @GetMapping("/getByJobId/{jobId}")
    public ApplicationPage fetchByJobId(@PathVariable int jobId,
                                              @RequestParam(defaultValue = "0", required = false) int page,
                                              @RequestParam(defaultValue = "10", required = false) int size) {
        return applicationService.fetchByJobId(jobId,page,size);
    }

    //update an application
    @PutMapping("/update/{id}")
    public void updateStatus(@PathVariable int id, @RequestParam Status status) {
        applicationService.updateStatus(id, status);
    }

    //delete an application
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        applicationService.delete(id);
    }

    //fetch the application by JobPostId
    @GetMapping("/getByJobPostId/{id}")
    public ApplicationDto getByJobPostId(@PathVariable int id) {
        return applicationService.getByJobPostId(id);
    }
    //upload resume
    @PostMapping("/upload/{id}")
    public void upload(@PathVariable  int id, @RequestParam("file") MultipartFile file) throws IOException {
        applicationService.upload( id, file);
    }

    @GetMapping("/all")
    public List<ApplicationDto> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/resume/application/{applicationId}")
    public ResponseEntity<Resource> getResume(
            @PathVariable int applicationId) throws IOException {

        Resource resource = applicationService.getResume(applicationId);

        String contentType =
                Files.probeContentType(resource.getFile().toPath());

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\""
                )
                .body(resource);
    }
}