package com.app.demo.DTO;

public record AdminStatsDto(
        long totalEmployees,
        long totalUsers,
        long totalJobs,
        long activeJobs,
        long inactiveJobs,
        long totalApplications,
        long totalSkills
) {}