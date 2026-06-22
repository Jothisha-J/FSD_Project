package com.app.demo.service;

import com.app.demo.DTO.JobPostDTO;
import com.app.demo.DTO.JobPostPage;
import com.app.demo.DTO.SkillJobCountDTO;
import com.app.demo.Mapper.JobPostMapper;
import com.app.demo.enums.JobType;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Employee;
import com.app.demo.model.JobPost;
import com.app.demo.model.Skills;
import com.app.demo.repository.JobPostRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;

import java.util.List;

@Service
@AllArgsConstructor
public class JobPostService {

    private final JobPostRepository jobPostRepository;
    private final EmployeeService employeeService;
    private final SkillsService skillsService;
    private final JobPostMapper jobPostMapper;

    public void addJob( JobPostDTO jobPostDTO) {
        //fetch the corresponding employee details
        Employee employee=employeeService.getEmployeeByID(jobPostDTO.employee_id());
        //fetch the corresponding skills details
        Skills skills=skillsService.getSkillById(jobPostDTO.skills_id());
        //convert the dto to entity using mapper
        JobPost jobPost=jobPostMapper.DtotoEntity(jobPostDTO,employee,skills);
        //add into db
        jobPostRepository.save(jobPost);

    }

    public JobPostPage getAll(int page, int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page, size);
        //fetch page of result
        Page<JobPost> jobPostPage=jobPostRepository.findAll(pageable);
        //fetch the list of JobPost and map it to dto
        List<JobPostDTO> jobPostDTOList=jobPostMapper.entityToDto(jobPostPage.getContent());
        return new JobPostPage(
                jobPostPage.getTotalElements(),
                jobPostPage.getTotalPages(),
                jobPostDTOList
        );
    }

    //returns the dto
    public JobPostDTO getById(int id) {
        //fetch the job post entity obj and then map it to dto
        return jobPostMapper.mapEntityToDTO(
                jobPostRepository.findById(id).orElseThrow(()->
                        new ResourceNotFoundException("Invalid JobId")));

    }

    //returns the entity
    public  JobPost getByIdEntity(int id){
        return jobPostRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Invalid JobId"));
    }

    public void updateJobPost(int id,JobPostDTO dto) {
        //validate and fetch jobPost id
        JobPost jobPost=getByIdEntity(id);
        //extract the employee details
        Employee employee=employeeService.getEmployeeByID(dto.employee_id());
        //get skills details
        Skills skills=skillsService.getSkillById(dto.skills_id());
        //update the old entity with the dto values
        jobPost.setTitle(dto.title());
        jobPost.setLocation(dto.location());
        jobPost.setJob_type(dto.job_type());
        jobPost.setExperience(dto.experience());
        jobPost.setDescription(dto.description());
        jobPost.setSkills_required(dto.skills_required());
        jobPost.setSalary_min(dto.salary_min());
        jobPost.setSalary_max(dto.salary_max());
        jobPost.setPosted_on(dto.posted_on());
        jobPost.setLast_date(dto.last_date());

        jobPost.setEmployee(employee);
        jobPost.setSkills(skills);

        jobPostRepository.save(jobPost);
    }

    public void delete(int id) {
        //validate the job post id
        getById(id);
        jobPostRepository.deleteById(id);
    }

    public JobPostPage getByEmpId(int id, int page, int size) {
        //create pageable
        Pageable pageable= PageRequest.of(page, size);
        //validate empId
        employeeService.getEmployeeByID(id);
        //get page of jobposts
        Page<JobPost> jobPostPage= jobPostRepository.getByEmpId(id,pageable);
        //convert to list
        List<JobPostDTO> jobPostDTOList=jobPostMapper.entityToDto(jobPostPage.getContent());
        return new JobPostPage(
                jobPostPage.getTotalElements(),
                jobPostPage.getTotalPages(),
                jobPostDTOList
        ) ;
    }


    public List<JobPostDTO> getAllJobs() {
        return jobPostRepository.findAll()
                .stream()
                .map(jobPostMapper::mapEntityToDTO)
                .toList();
    }

    public List<SkillJobCountDTO> countJobsBySkill() {
        return jobPostRepository.countJobsBySkill();
    }


    public JobPostPage searchJobs(
            String keyword,
            String jobType,
            Integer minExp,
            Integer maxExp,
            Double salaryMin,
            Double salaryMax,
            Integer skillId,
            String sortBy,
            int page,
            int size) {
        Sort sort = Sort.by("posted_on").descending();
        if ("salary_high".equals(sortBy)) {
            sort = Sort.by("salary_max").descending();
        }
        if ("salary_low".equals(sortBy)) {
            sort = Sort.by("salary_min").ascending();
        }
        JobType jobTypeEnum = null;
        if (jobType != null && !jobType.isBlank() && !"ALL".equalsIgnoreCase(jobType)) {
            jobTypeEnum = JobType.valueOf(jobType);
        }
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<JobPost> pages = jobPostRepository.searchJobs(
                keyword,
                jobTypeEnum,
                skillId,
                minExp,
                maxExp,
                salaryMin,
                salaryMax,
                pageable);

        List<JobPostDTO> dtoList = pages.getContent()
                .stream()
                .map(jobPostMapper::mapEntityToDTO)
                .toList();

        return new JobPostPage(
                pages.getTotalElements(),
                pages.getTotalPages(),
                dtoList);
    }

}
