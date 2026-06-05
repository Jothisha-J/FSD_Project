package com.test.api.service;

import com.test.api.dto.Seekerdto;
import com.test.api.exception.ResourceNotFoundException;
import com.test.api.mapper.JobSeekerMapper;
import com.test.api.model.JobSeeker;
import com.test.api.model.Login;
import com.test.api.repository.JobSeekerRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobSeekerService {

    private final JobSeekerRepository jobSeekerRepository;
    private final LoginService loginService;
    private final JobSeekerMapper jobSeekerMapper;

    public void add(@Valid Seekerdto dto, String name) {
        //validate login
        Login user=loginService.getByUsername(name);
        //convert dto to entity
        jobSeekerRepository.save(jobSeekerMapper.mapToEntity(dto,user));
    }

    public JobSeeker getById(String name) {
        //validate login
        Login user=loginService.getByUsername(name);
        return jobSeekerRepository.findByUserName(name).orElseThrow(()->
                new ResourceNotFoundException("Invalid JobSeeker"));
    }
}
