package com.app.demo.service;

import com.app.demo.DTO.ExperienceDTO;
import com.app.demo.DTO.ExperiencePage;
import com.app.demo.Mapper.ExperienceMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Experience;
import com.app.demo.model.JobSeeker;
import com.app.demo.repository.ExperienceRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final JobSeekerService jobSeekerService;
    private final ExperienceMapper experienceMapper;

    public void addExp( ExperienceDTO experienceDTO, String username) {
        //fetch user profile of the user
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //map dto to entity
        Experience experience = experienceMapper.DTOtoEntity(experienceDTO, jobSeeker);
        //save it
        experienceRepository.save(experience);
    }

    public ExperiencePage getMyExperiences(String username,int page,int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page,size);
        //fetch user profile details
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //fetch Page of result
        Page<Experience> experiencePage=experienceRepository.getExpByUserId(jobSeeker.getId(),pageable);
        //convert page to list
        List<Experience> experienceList=experiencePage.getContent();
        //map entity to dto
        List<ExperienceDTO> experienceDTOList=experienceMapper.entityToDto(experienceList);
        return new ExperiencePage(
                experiencePage.getTotalElements(),
                experiencePage.getTotalPages(),
                experienceDTOList
        );
    }

    private Experience getExpByExpId(int expId) {
        //return experience by Id
        return experienceRepository.findById(expId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Experience ID"));
    }

    public void updateExp(ExperienceDTO experienceDTO,
            int expId, String username) {
    //fetch user profile
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
    //fetch existing records
        Experience old = getExpByExpId(expId);
    //changes
        old.setCompany_name(experienceDTO.company_name());
        old.setRole(experienceDTO.role());
        old.setDescription(experienceDTO.description());
        old.setStart_date(experienceDTO.start_date());
        old.setEnd_date(experienceDTO.end_date());
        old.setCurrently_working(experienceDTO.currently_working());
    //update
        experienceRepository.save(old);
    }

    public void deleteExp(int expId, String username) {
        //fetch to validate
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //extract existing record
        Experience experience = getExpByExpId(expId);
        //delete record
        experienceRepository.delete(experience);
    }
}