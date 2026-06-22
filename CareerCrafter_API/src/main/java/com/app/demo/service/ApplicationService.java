package com.app.demo.service;

import com.app.demo.DTO.ApplicationDto;
import com.app.demo.DTO.ApplicationPage;

import com.app.demo.Mapper.ApplicationMapper;
import com.app.demo.enums.Status;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Application;
import com.app.demo.model.JobPost;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.User;
import com.app.demo.repository.ApplicationRepository;
import com.app.demo.repository.JobPostRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;


@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobSeekerService jobSeekerService;
    private final JobPostService jobPostService;
    private final ApplicationMapper applicationMapper;
    private final UserService userService;
    private final JobPostRepository jobPostRepository;
    private static final String UPLOAD_LOC = "C:/Users/HP/IdeaProjects/CareerCrafter_UI/public";
    public int add(ApplicationDto dto, String username) {

        User user = (User) userService.loadUserByUsername(username);

        JobSeeker jobSeeker =
                jobSeekerService.getProfile(user.getUsername());

        JobPost jobPost =
                jobPostRepository.findById(dto.jobPostId())
                        .orElseThrow();

        Application application = new Application();

        application.setJobSeeker(jobSeeker);
        application.setJobPost(jobPost);
        application.setStatus(Status.APPLIED);
        application.setResume("PENDING");


        applicationRepository.save(application);

        return application.getId();
    }
    public ApplicationPage fetchMyApplications(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        JobSeeker jobSeeker = jobSeekerService.getProfile(username);
        Page<Application> applications = applicationRepository.fetchByUserId(jobSeeker.getId(), pageable);
        List<ApplicationDto> listApplication = applications.getContent().stream()
                .map(applicationMapper::EntityToDto).toList();
        return new ApplicationPage(
                applications.getTotalElements(),
                applications.getTotalPages(),
                listApplication
        );
    }

    public ApplicationPage fetchByJobId(int jobId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Application> applications = applicationRepository.fetchByJobId(jobId, pageable);
        List<ApplicationDto> dto = applications.getContent().stream()
                .map(applicationMapper::EntityToDto).toList();
        return new ApplicationPage(
                applications.getTotalElements(),
                applications.getTotalPages(),
                dto
        );
    }

    public ApplicationDto getByJobPostId(int id) {
        jobPostService.getById(id);
        Application application = applicationRepository.getByJobPostId(id);
        return applicationMapper.EntityToDto(application);
    }
    public void updateStatus(int id, Status status) {
        //fetch the application by applicationid
        Application application = getById(id);
        //update the status
        application.setStatus(status);
        //save the changes
        applicationRepository.save(application);
    }

    public Application getById(int id) {
        //get the application by its id
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Application Id"));
    }

    public void delete(int id) {
        //validate if the application id is present
        getById(id);
        //delete the application
        applicationRepository.deleteById(id);
    }


    public void upload(int applicationId, MultipartFile file) throws IOException {

        System.out.println("File Name = " + file.getOriginalFilename());

        Application application = getById(applicationId);

        String fileName = file.getOriginalFilename();

        Path uploadPath = Paths.get(UPLOAD_LOC);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path destinationPath = uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                destinationPath,
                StandardCopyOption.REPLACE_EXISTING
        );

        System.out.println("Saved To = " + destinationPath.toAbsolutePath());

        application.setResume(fileName);

        applicationRepository.save(application);

        System.out.println("DB Updated");
    }


    public List<ApplicationDto> getAllApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(applicationMapper::EntityToDto)
                .toList();
    }

    public Resource getResume(int applicationId) throws MalformedURLException {

        Application application = getById(applicationId);

        if (application.getResume() == null ||
                application.getResume().isBlank()) {

            throw new ResourceNotFoundException("Resume not uploaded");
        }

        Path filePath = Paths.get(
                UPLOAD_LOC,
                application.getResume()
        );

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new ResourceNotFoundException(
                    "Resume file not found"
            );
        }

        return resource;
    }

}