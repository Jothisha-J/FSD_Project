package com.app.demo.DTO;

public record EmployeeStatsDTO(
        long totalJobs,
        long activeJobs,
        long inactiveJobs,
        long totalApplications
) {}