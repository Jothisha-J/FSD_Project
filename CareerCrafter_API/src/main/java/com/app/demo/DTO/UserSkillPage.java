package com.app.demo.DTO;

import java.util.List;

public record UserSkillPage(
        long TotalElements,
        int TotalPage,
        List<UserSkillDto> userSkillDtoList
) {
}
