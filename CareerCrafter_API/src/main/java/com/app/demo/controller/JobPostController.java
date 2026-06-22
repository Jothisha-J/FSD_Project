package com.app.demo.controller;

import com.app.demo.DTO.JobPostDTO;
import com.app.demo.DTO.JobPostPage;
import com.app.demo.DTO.SkillJobCountDTO;
import com.app.demo.service.JobPostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class JobPostController {

    private  final JobPostService jobPostService;

    //adding new job post
    @PostMapping("/api/jobpost/add")
    public void addJob(@Valid @RequestBody JobPostDTO jobPostDTO){
        jobPostService.addJob(jobPostDTO);
    }

    //get all job post
    @GetMapping("/api/jobpost/getAll")
        public JobPostPage getAll(@RequestParam(defaultValue = "0", required = false) int page,
                                  @RequestParam(defaultValue = "10", required = false) int size){
            return jobPostService.getAll(page,size);
        }

    //get job post by job id
    @GetMapping("/api/jobpost/getById/{id}")
    public  JobPostDTO getById(@PathVariable int id){
        return  jobPostService.getById(id);
    }

    //update job post
    @PutMapping("/api/jobpost/update/{id}")
    public void  updateJobPost(@PathVariable int id,@RequestBody JobPostDTO dto){
        jobPostService.updateJobPost(id,dto);
    }

    //delete an job post
    @DeleteMapping("/api/jobpost/delete/{id}")
    public void delete(@PathVariable int id){
        jobPostService.delete(id);
    }

    //get jobs posted by employeeId
    @GetMapping("/api/jobpost/getByEmpId/{id}")
    public JobPostPage getByEmpId(@PathVariable int id,
                                       @RequestParam(defaultValue = "0", required = false) int page,
                                       @RequestParam(defaultValue = "10", required = false) int size){
        return jobPostService.getByEmpId(id,page,size);
    }

    @GetMapping("/api/jobpost/all")
    public List<JobPostDTO> getAllJobs() {
        return jobPostService.getAllJobs();
    }

    @GetMapping("/api/admin/skills-jobs")
    public List<SkillJobCountDTO> getSkillsJobCount() {
        return jobPostService.countJobsBySkill();
    }

    @GetMapping("/api/jobpost/search")
    public ResponseEntity<JobPostPage> searchJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) Integer skillId,
            @RequestParam(required = false) Integer minExp,
            @RequestParam(required = false) Integer maxExp,
            @RequestParam(required = false) Double salaryMin,
            @RequestParam(required = false) Double salaryMax,
            @RequestParam(defaultValue = "recent") String sortBy) {
        JobPostPage result = jobPostService.searchJobs(
                keyword,
                jobType,
                minExp,
                maxExp,
                salaryMin,
                salaryMax,
                skillId,
                sortBy,
                page,
                size);

        return ResponseEntity.ok(result);
    }

    }


