package com.app.demo.Mapper;

import com.app.demo.DTO.JobPostDTO;
import com.app.demo.model.Employee;
import com.app.demo.model.JobPost;
import com.app.demo.model.Skills;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobPostMapper {

    public JobPost DtotoEntity(JobPostDTO dto, Employee employee, Skills skills) {
        JobPost jobPost = new JobPost();

        jobPost.setTitle(dto.title());
        jobPost.setLocation(dto.location());
        jobPost.setJob_type(dto.job_type());
        jobPost.setExperience(dto.experience());
        jobPost.setDescription(dto.description());
        jobPost.setSkills_required(dto.skills_required());
        jobPost.setSalary_min(dto.salary_min());
        jobPost.setSalary_max(dto.salary_max());
        jobPost.setPosted_on(dto.posted_on());
        jobPost.setLast_date(dto.last_date());

        jobPost.setEmployee(employee);
        jobPost.setSkills(skills);

        return jobPost;
    }

    public List<JobPostDTO> entityToDto(List<JobPost> jobPosts) {
        return jobPosts.stream().map(
                jobPost ->
                        new JobPostDTO(
                                jobPost.getId(),
                                jobPost.getTitle(),
                                jobPost.getLocation(),
                                jobPost.getJob_type(),
                                jobPost.getExperience(),
                                jobPost.getDescription(),
                                jobPost.getSkills_required(),
                                jobPost.getSalary_min(),
                                jobPost.getSalary_max(),
                                jobPost.getPosted_on(),
                                jobPost.getLast_date(),
                                jobPost.getEmployee().getId(),
                                jobPost.getSkills() != null ? jobPost.getSkills().getId() : null
                        )
        ).toList();
    }

    public JobPostDTO mapEntityToDTO(JobPost jobPost) {
        return new JobPostDTO(
                jobPost.getId(),
                jobPost.getTitle(),
                jobPost.getLocation(),
                jobPost.getJob_type(),
                jobPost.getExperience(),
                jobPost.getDescription(),
                jobPost.getSkills_required(),
                jobPost.getSalary_min(),
                jobPost.getSalary_max(),
                jobPost.getPosted_on(),
                jobPost.getLast_date(),
                jobPost.getEmployee().getId(),
                jobPost.getSkills() != null ? jobPost.getSkills().getId() : null
        );
    }
}