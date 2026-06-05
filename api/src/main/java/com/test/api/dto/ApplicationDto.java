package com.test.api.dto;

import java.time.LocalDate;
import java.util.Date;

public record ApplicationDto(
        int application_id,
        LocalDate date,
        int job_id
) {
}
