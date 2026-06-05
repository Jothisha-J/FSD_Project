package com.test.api.service;

import com.test.api.dto.ApplicationDto;
import com.test.api.dto.ApplicationPage;
import com.test.api.mapper.ApplicationMapper;
import com.test.api.model.Application;
import com.test.api.model.Job;
import com.test.api.model.JobSeeker;
import com.test.api.model.Login;
import com.test.api.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final LoginService loginService;
    private final JobService jobService;
    private final JobSeekerService jobSeekerService;
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public void addApplication(int jobId, String name) {
        //validate user
        JobSeeker jobSeeker=jobSeekerService.getById(name);
        //validate job Id
        Job job=jobService.getById(jobId);
        //create application entity
        Application application=new Application();
        application.setJob(job);
        application.setJobSeeker(jobSeeker);
        application.setAppliedAt(LocalDate.now());
        //save into db
        applicationRepository.save(application);

    }

    public ApplicationPage getAll(int page, int size) {
        //create pagesable
        Pageable pageable= PageRequest.of(page, size);
        //fetch list of entity
       Page<Application>applications= applicationRepository.findAll(pageable);
        //convert pages to dto
        List<ApplicationDto> list=applications.stream().map(applicationMapper::mapToDto).toList();
        //retrn page
        return new ApplicationPage(
          applications.getNumberOfElements(),
          applications.getTotalPages()  ,
                list
        );

    }
}
