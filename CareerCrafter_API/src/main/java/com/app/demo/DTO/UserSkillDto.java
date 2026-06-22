package com.app.demo.DTO;

import com.app.demo.enums.Proficiency;

public record UserSkillDto(
        int id,
        String skill_name,
        Proficiency proficiency,
        String certification
) {
}