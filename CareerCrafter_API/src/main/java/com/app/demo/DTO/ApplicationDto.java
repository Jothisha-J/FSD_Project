package com.app.demo.DTO;

import com.app.demo.enums.Status;

public record ApplicationDto(

        int id,

        String resume,

        Status status,

        // Job Seeker Details
        int userProfileId,
        String applicantName,
        String applicantEmail,
        Long applicantPhone,
        String applicantAddress,

        // Job Details
        int jobPostId,
        String jobTitle,

        // Company Details
        int employeeId,
        String companyName

) {
}