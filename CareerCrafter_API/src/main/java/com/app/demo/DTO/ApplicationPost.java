package com.app.demo.DTO;

import com.app.demo.enums.Status;

public record ApplicationPost(
        int id,
        String resume,
        Status status,
        int jobPostId
) {
}