package com.test.api.mapper;

import com.test.api.dto.Seekerdto;
import com.test.api.model.JobSeeker;
import com.test.api.model.Login;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class JobSeekerMapper {


    public JobSeeker mapToEntity(@Valid Seekerdto dto, Login user) {
        JobSeeker jobSeeker=new JobSeeker();
        jobSeeker.setName(dto.name());
        jobSeeker.setResumeSummary(dto.resumeSummary());
        jobSeeker.setUser(user);
        return jobSeeker;

    }
}
