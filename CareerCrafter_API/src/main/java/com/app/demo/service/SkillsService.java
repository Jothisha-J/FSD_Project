package com.app.demo.service;

import com.app.demo.DTO.SkillDTO;
import com.app.demo.DTO.SkillPage;
import com.app.demo.Mapper.SkillsMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Skills;
import com.app.demo.repository.SkillsRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SkillsService {

    private  final SkillsRepository skillsRepository;
    private final SkillsMapper skillsMapper;

    public void addSkill(Skills skill) {
        skillsRepository.save(skill);
    }

    public SkillPage getAll(int page, int size) {
        Page<Skills> skillsPage= skillsRepository.findAll(PageRequest.of(page, size));
        List<SkillDTO> skillsDTOS= skillsMapper.mapEntityToDto(skillsPage.getContent());
        return new SkillPage(
                skillsPage.getTotalElements(),
                skillsPage.getTotalPages(),
                skillsDTOS
        );
    }

    public Skills getSkillBySkillName(String skill_name) {
        return skillsRepository.findBySkill_name(skill_name);
    }

    public Skills getSkillById(Integer integer) {
        return skillsRepository.findById(integer).orElseThrow(()->new ResourceNotFoundException("Invalid Skills iD"));
    }

    public void deleteSkill(int id) {
        skillsRepository.deleteById(id);
    }

    public List<Skills> getAllSkills() {
        return skillsRepository.findAll();
    }
}
