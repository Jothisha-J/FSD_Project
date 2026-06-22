package com.app.demo.DTO;

import java.time.LocalDate;

public record EducationDTO(
        int id,
        String institution,
        String degree,
        String fieldOfStudy,
        LocalDate startDate,
        LocalDate endDate,
        Boolean currentlyPursuing
) {
}