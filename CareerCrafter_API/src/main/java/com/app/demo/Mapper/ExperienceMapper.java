package com.app.demo.Mapper;

import com.app.demo.DTO.ExperienceDTO;
import com.app.demo.model.Experience;
import com.app.demo.model.JobSeeker;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExperienceMapper {

    public List<ExperienceDTO> entityToDto(List<Experience> experiences) {

        return experiences.stream()
                .map(experience ->
                        new ExperienceDTO(
                                experience.getId(),
                                experience.getCompany_name(),
                                experience.getRole(),
                                experience.getDescription(),
                                experience.getStart_date(),
                                experience.getEnd_date(),
                                experience.isCurrently_working()
                        )
                )
                .toList();
    }

    public Experience DTOtoEntity(
            ExperienceDTO dto,
            JobSeeker jobSeeker) {

        Experience experience = new Experience();

        experience.setCompany_name(dto.company_name());
        experience.setRole(dto.role());
        experience.setDescription(dto.description());
        experience.setStart_date(dto.start_date());
        experience.setEnd_date(dto.end_date());
        experience.setCurrently_working(dto.currently_working());
        experience.setJobSeeker(jobSeeker);

        return experience;
    }
}