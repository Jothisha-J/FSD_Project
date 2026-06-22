package com.app.demo.Mapper;

import com.app.demo.DTO.ApplicationDto;
import com.app.demo.enums.Status;
import com.app.demo.model.Application;
import com.app.demo.model.JobPost;
import com.app.demo.model.JobSeeker;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public Application mapDtoToEntity(
            ApplicationDto dto,
            JobPost jobPost,
            JobSeeker jobSeeker) {

        Application app = new Application();
        app.setResume(dto.resume());
        app.setStatus(Status.APPLIED);
        app.setJobPost(jobPost);
        app.setJobSeeker(jobSeeker);

        return app;
    }

    public ApplicationDto EntityToDto(Application application) {
        JobSeeker jobSeeker = application.getJobSeeker();
        JobPost jobPost = application.getJobPost();

        return new ApplicationDto(
                application.getId(),
                application.getResume(),
                application.getStatus(),
                jobSeeker.getId(),
                jobSeeker.getName(),
                jobSeeker.getEmail(),
                jobSeeker.getPhone(),
                jobSeeker.getAddress(),
                jobPost.getId(),
                jobPost.getTitle(),
                jobPost.getEmployee().getId(),
                jobPost.getEmployee().getCompany_name()
        );
    }
}