package com.app.demo.DTO;

import java.util.List;

public record ApplicationPage(
        long TotalElement,
        int TotalPage,
        List<ApplicationDto> applicationPostList
) {
}
