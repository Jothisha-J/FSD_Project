package com.app.demo.service;

import com.app.demo.DTO.JobSeekerDTO;
import com.app.demo.DTO.JobSeekerPage;
import com.app.demo.DTO.JobSeekerStatsDTO;
import com.app.demo.Mapper.JobSeekerMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.User;
import com.app.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobSeekerService {

    private final UserProfileRepository userProfileRepository;
    private final LoginService userService;
    private final JobSeekerMapper userMapper;
    private final ApplicationRepository applicationRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final UserSkillsRepository userSkillsRepository;

    public void setUserProfile(JobSeekerDTO jobSeeker, String username) {
        //extract login info
        //validate
        User user = userService.getByUsername(username);
        //convert dto to entity
        JobSeeker jobSeekerEntity=userMapper.DtoToEntity(jobSeeker);
        //set login
        jobSeekerEntity.setUser(user);
        userProfileRepository.save(jobSeekerEntity);
    }

    public JobSeeker getProfile(String username) {
        User user = userService.getByUsername(username);
        return userProfileRepository.findByLogin(user.getUsername())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found"));
    }

    public JobSeekerPage getAll(int page, int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page, size);
        //fetch list of User
        Page<JobSeeker> users = userProfileRepository.findAll(pageable);
        //convert page to dto list
        List<JobSeekerDTO> jobSeekerDTOList=userMapper.EntityToDto(users.getContent());
        //map to dto
        return new JobSeekerPage(
                users.getTotalElements(),
                users.getTotalPages(),
                jobSeekerDTOList
        );
    }

    public void update(JobSeekerDTO jobSeeker, String username) {
    //fetch existing record
        JobSeeker existingProfile = getProfile(username);
    //changes
        existingProfile.setName(jobSeeker.name());
        existingProfile.setEmail(jobSeeker.email());
        existingProfile.setAddress(jobSeeker.address());
        existingProfile.setBio(jobSeeker.bio());
    //update changes
        userProfileRepository.save(existingProfile);
    }

    public List<JobSeekerDTO> getAllJobSeekers() {
        return userMapper.EntityToDto(userProfileRepository.findAll());
    }

    public JobSeekerStatsDTO getStats(String username) {
        JobSeeker jobSeeker = getProfile(username);

        long totalApplications = applicationRepository.countByJobSeeker(jobSeeker);
        long totalSkills = userSkillsRepository.countByJobSeeker(jobSeeker);
        long totalExperiences = experienceRepository.countByJobSeeker(jobSeeker);
        long totalEducations = educationRepository.countByJobSeeker(jobSeeker);

        return new JobSeekerStatsDTO(
                totalApplications,
                totalSkills,
                totalExperiences,
                totalEducations
        );
    }
}