package com.app.demo.DTO;

import java.util.List;

public record ExperiencePage(
        long TotalElements,
        int totalPage,
        List<ExperienceDTO> experienceDTOList
) {
}
