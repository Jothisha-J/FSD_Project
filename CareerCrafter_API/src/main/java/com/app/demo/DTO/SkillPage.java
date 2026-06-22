package com.app.demo.DTO;

import java.util.List;

public record SkillPage(
        long TotalElements,
        int TotalPages,
        List<SkillDTO> skillDTOList
) {
}
