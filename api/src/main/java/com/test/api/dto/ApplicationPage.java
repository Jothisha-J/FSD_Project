package com.test.api.dto;

import java.util.List;

public record ApplicationPage(
        int toatlElements,
        int totalPages,
        List<ApplicationDto> list
) {
}
