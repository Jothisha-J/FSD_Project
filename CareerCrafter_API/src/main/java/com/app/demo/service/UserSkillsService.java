package com.app.demo.service;

import com.app.demo.DTO.UserSkillDto;
import com.app.demo.DTO.UserSkillPage;
import com.app.demo.Mapper.SkillDtoMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.Skills;
import com.app.demo.model.UserSkills;
import com.app.demo.repository.UserSkillsRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserSkillsService {

    private final UserSkillsRepository userSkillsRepository;
    private final JobSeekerService jobSeekerService;
    private final SkillDtoMapper skillDtoMapper;
    private final SkillsService skillsService;

    public UserSkillPage getMySkills(String username, int page, int size) {
        //pageable declaration
        Pageable pageable= PageRequest.of(page,size);
        //fetch user profile
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //fetch skills
        Page<UserSkills> userSkills = userSkillsRepository.getSkillByUserId(jobSeeker.getId(),pageable);
        //convert it to dto list
        List<UserSkillDto> userSkillDtoList=SkillDtoMapper.EntitytoDto(userSkills.getContent());
        //map entity to dto
        return new UserSkillPage(
                userSkills.getTotalElements(),
                userSkills.getTotalPages(),
                userSkillDtoList
        );
    }
    public void addUserSkill(String username, UserSkillDto dto) {
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        Skills skill = skillsService.getSkillById(dto.id());
        userSkillsRepository.save(
                skillDtoMapper.dtoToEntity(dto, skill, jobSeeker)
        );
    }

    public void deleteSkill(String username, int userSkillId) {
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);

        UserSkills userSkill = userSkillsRepository.findById(userSkillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        if (userSkill.getJobSeeker().getId() != jobSeeker.getId()) {
            throw new ResourceNotFoundException("Not authorized to delete this skill");
        }

        userSkillsRepository.deleteById(userSkill.getId());
    }
}