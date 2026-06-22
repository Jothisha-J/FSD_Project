package com.app.demo.Mapper;

import com.app.demo.DTO.EducationDTO;
import com.app.demo.model.Education;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EducationMapper {

    public List<EducationDTO> entityToDto(
            List<Education> educations) {

        return educations.stream()
                .map(education -> new EducationDTO(
                        education.getId(),
                        education.getInstitution(),
                        education.getDegree(),
                        education.getFieldOfStudy(),
                        education.getStartDate(),
                        education.getEndDate(),
                        education.isCurrentlyPursuing()
                ))
                .toList();
    }

    public Education DTOToEntity(EducationDTO educationdto) {
        Education education=new Education();
        education.setCurrentlyPursuing(educationdto.currentlyPursuing());
        education.setDegree(educationdto.degree());
        education.setStartDate(educationdto.startDate());
        education.setEndDate(educationdto.endDate());
        education.setInstitution(educationdto.institution());
        education.setFieldOfStudy(educationdto.fieldOfStudy());
        return education;
    }
}