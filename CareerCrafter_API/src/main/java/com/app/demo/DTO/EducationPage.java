package com.app.demo.DTO;

import java.util.List;

public record EducationPage(
        long totalElements,
        int totalPages,
        List<EducationDTO> educationDTOList
) {
}
