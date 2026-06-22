package com.app.demo.DTO;

public record JobSeekerStatsDTO(
        long totalApplications,
        long totalSkills,
        long totalExperiences,
        long totalEducations
) {}