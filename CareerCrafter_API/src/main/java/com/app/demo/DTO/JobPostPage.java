package com.app.demo.DTO;

import java.util.List;

public record JobPostPage(
        long TotalElements,
        int TotalPage,
        List<JobPostDTO> jobPostDTOList
) {
}
