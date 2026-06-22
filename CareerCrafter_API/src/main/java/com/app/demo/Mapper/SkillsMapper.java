package com.app.demo.Mapper;

import com.app.demo.DTO.SkillDTO;
import com.app.demo.model.Skills;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SkillsMapper {
    public List<SkillDTO> mapEntityToDto(List<Skills> content) {
        return content.stream().map(
                skills ->
                        new SkillDTO(
                                skills.getId(),
                                skills.getSkill_name()
                        )
        ).toList();
    }
}
