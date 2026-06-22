package com.app.demo.DTO;

import java.util.List;

public record JobSeekerPage (
        long totalElements,
        int totalPages,
        List<JobSeekerDTO> jobSeekerDTOList
){
}
