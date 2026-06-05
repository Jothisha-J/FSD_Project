package com.test.api.dto;

import java.util.List;

public record JobPage (
        int totalElements,
        int totalPage,
        List<JobPostDto> dto
){
}
