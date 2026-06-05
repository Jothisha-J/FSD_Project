package com.test.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BookDto(
        @NotNull
        @NotBlank(message = "title must not be blank")
        String title,
        @NotBlank(message = "summary must not be blank")
        String summary
) {
}
