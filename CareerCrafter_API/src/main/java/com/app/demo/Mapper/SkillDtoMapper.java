package com.app.demo.Mapper;

import com.app.demo.DTO.UserSkillDto;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.Skills;
import com.app.demo.model.UserSkills;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SkillDtoMapper {

    public static List<UserSkillDto> EntitytoDto(List<UserSkills> userskills) {
        return userskills.stream()
                .filter(userSkills -> userSkills.getSkill() != null)
                .map(
                        userSkills ->
                                new UserSkillDto(
                                        userSkills.getId(),
                                        userSkills.getSkill().getSkill_name(),
                                        userSkills.getProficiency(),
                                        userSkills.getCertification()
                                )).toList();
    }

    public UserSkills dtoToEntity(UserSkillDto dto, Skills skill, JobSeeker jobSeeker) {
        UserSkills userSkills = new UserSkills();
        userSkills.setSkill(skill);
        userSkills.setCertification(dto.certification());
        userSkills.setProficiency(dto.proficiency());
        userSkills.setJobSeeker(jobSeeker);
        return userSkills;
    }
}