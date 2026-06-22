package com.app.demo.DTO;

public record SkillJobCountDTO(
        String skillName,
        long jobCount,
        long applicationCount
) {}