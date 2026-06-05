package com.test.api.mapper;

import com.test.api.dto.JobPostDto;
import com.test.api.model.Employer;
import com.test.api.model.Job;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobPostMapper {


    public Job mapToEntity(@Valid JobPostDto dto, Employer employer) {
        Job job=new Job();
        job.setDescription(dto.description());
        job.setEmployer(employer);
        job.setTitle(dto.title());
        job.setSalary(dto.salary());
        job.setLocation(dto.location());
        return job;
    }

    public List<JobPostDto> mapToDTO(Page<Job> jobs) {
        return jobs.stream().map(
                job ->
                        new JobPostDto(
                                job.getTitle(),
                                job.getDescription(),
                                job.getLocation(),
                                job.getSalary()
                        )
        ).toList();
    }
}
