package com.app.demo.service;

import com.app.demo.DTO.AdminStatsDto;
import com.app.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AdminService {

    private final EmployeeRepository employeeRepository;
    private final UserProfileRepository userProfileRepository;
    private final JobPostRepository jobPostRepository;
    private final ApplicationRepository applicationRepository;
    private final SkillsRepository skillsRepository;

    public AdminStatsDto getStats() {
        return new AdminStatsDto(
                employeeRepository.count(),
                userProfileRepository.count(),
                jobPostRepository.count(),
                jobPostRepository.countActiveJobs(),
                jobPostRepository.countInactiveJobs(),
                applicationRepository.count(),
                skillsRepository.count()
        );
    }
}