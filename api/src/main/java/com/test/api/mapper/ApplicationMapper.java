package com.test.api.mapper;

import com.test.api.dto.ApplicationDto;
import com.test.api.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationDto mapToDto(Application application)
    {
        return new ApplicationDto(
          application.getId(),
          application.getAppliedAt(),
          application.getJob().getId()
        );
    }
}
