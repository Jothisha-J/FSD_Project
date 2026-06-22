package com.app.demo.Mapper;

import com.app.demo.DTO.JobSeekerDTO;
import com.app.demo.model.JobSeeker;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobSeekerMapper {

    public List<JobSeekerDTO> EntityToDto(List<JobSeeker> users){
        return  users.stream().map(userProfile ->
                new JobSeekerDTO(
                        userProfile.getName(),
                        userProfile.getEmail(),
                        userProfile.getPhone(),
                        userProfile.getAddress(),
                        userProfile.getBio()
                )
                ).toList();
    }

    public JobSeeker DtoToEntity(JobSeekerDTO jobSeeker) {
        JobSeeker jobSeeker1=new JobSeeker();
        jobSeeker1.setAddress(jobSeeker.address());
        jobSeeker1.setBio(jobSeeker.bio());
        jobSeeker1.setEmail(jobSeeker.email());
        jobSeeker1.setPhone(jobSeeker.phone());
        jobSeeker1.setName(jobSeeker.name());
        return jobSeeker1;
    }
}
