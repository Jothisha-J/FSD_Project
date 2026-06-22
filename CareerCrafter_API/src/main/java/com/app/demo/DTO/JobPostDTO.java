package com.app.demo.DTO;

import com.app.demo.enums.JobType;

import java.time.LocalDate;

public record JobPostDTO(
        Integer id,
        String title,
        String location,
        JobType job_type,
        int experience,
        String description,
        String skills_required,
        double salary_min,
        double salary_max,
        LocalDate posted_on,
        LocalDate last_date,
        int employee_id,
        Integer skills_id
) {
}