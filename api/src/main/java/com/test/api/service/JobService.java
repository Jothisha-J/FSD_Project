package com.test.api.service;

import com.test.api.dto.JobPage;
import com.test.api.dto.JobPostDto;
import com.test.api.exception.ResourceNotFoundException;
import com.test.api.mapper.JobPostMapper;
import com.test.api.model.Employer;
import com.test.api.model.Job;
import com.test.api.repository.JobRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {

    private final EmployerService employerService;
    private final JobPostMapper jobPostMapper;
    private final JobRepository jobRepository;

    public void addJob(@Valid JobPostDto dto, String name) {
        //validate and extract employee data
        Employer employer=employerService.findEmp(name);
        //convert the dto to entity
        Job job=jobPostMapper.mapToEntity(dto,employer);
        //add job to db
        jobRepository.save(job);

    }

    public JobPage getAll(int page, int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page,size);
        //fetch all records
        Page<Job> jobs=jobRepository.findAll(pageable);
        //convert to EntityList
        List<Job> jobList=jobs.getContent();
        //convet to dto list
        List<JobPostDto> dto=jobPostMapper.mapToDTO(jobs);
        return new JobPage(
                jobs.getNumberOfElements(),
                jobs.getTotalPages(),
                dto
        );


    }

    public Job getById(int jobId) {
        return jobRepository.findById(jobId).orElseThrow(
                ()-> new ResourceNotFoundException("Job Does not Exist")
        );
    }
}
