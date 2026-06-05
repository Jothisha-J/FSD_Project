package com.test.api.dto;

public record JobPostDto(
        String title,
        String description,
        String location,
        double salary
) {
}
