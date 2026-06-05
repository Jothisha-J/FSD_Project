package com.test.api.dto;

public record LoginResponseDto(
        int id,
        String username,
        String role
) {
}
