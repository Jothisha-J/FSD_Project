package com.app.demo.service;

import com.app.demo.DTO.EducationDTO;
import com.app.demo.DTO.EducationPage;
import com.app.demo.Mapper.EducationMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Education;
import com.app.demo.model.JobSeeker;
import com.app.demo.repository.EducationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EducationService {

    private final EducationRepository educationRepository;
    private final EducationMapper educationMapper;
    private final JobSeekerService jobSeekerService;


    public void addEducation(EducationDTO educationdto, String username) {
        //extract the user profile using username
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //map dto to entity
        Education education=educationMapper.DTOToEntity(educationdto);
        //map the user profile to the education
        education.setJobSeeker(jobSeeker);
        //add the education details
        educationRepository.save(education);
    }

    public EducationPage getEducation(String username, int page, int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page,size);
        //extract the user profile using username
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //fetch education
        Page<Education> educations=educationRepository.findByUserId(jobSeeker.getId(),pageable);
        //convert to list
        List<Education> educationList=educations.getContent();
        //map to dto
        List<EducationDTO> educationDTOS=educationMapper.entityToDto(educationList);
        return new EducationPage(
                educations.getTotalElements(),
                educations.getTotalPages(),
                educationDTOS
        );
    }

    public Education getById(int id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Education Id"));
    }

    public void updateEducation(Education education, int educationId, String username) {
        //extract the user profile using username
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        //fetch the existing record
        Education old = getById(educationId);
        //update details
        old.setInstitution(education.getInstitution());
        old.setDegree(education.getDegree());
        old.setFieldOfStudy(education.getFieldOfStudy());
        old.setStartDate(education.getStartDate());
        old.setEndDate(education.getEndDate());
        old.setCurrentlyPursuing(education.isCurrentlyPursuing());
        //save the changes
        educationRepository.save(old);
    }

    public void deleteByEdId(int educationId) {
        //validate the education id
        getById(educationId);
        //delete the education record
        educationRepository.deleteById(educationId);
    }
}