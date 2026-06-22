package com.app.demo.DTO;

import java.time.LocalDate;

public record ExperienceDTO(
        int id,
        String company_name,
        String role,
        String description,
        LocalDate start_date,
        LocalDate end_date,
        boolean currently_working
) {
}