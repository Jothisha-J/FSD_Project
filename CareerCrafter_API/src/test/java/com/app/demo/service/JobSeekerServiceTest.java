package com.app.demo.service;

import com.app.demo.DTO.JobSeekerDTO;
import com.app.demo.Mapper.JobSeekerMapper;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.User;
import com.app.demo.repository.UserProfileRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JobSeekerServiceTest {
    @Mock
    private UserProfileRepository jobSeekerRepository;

    @Mock
    private JobSeekerMapper jobSeekerMapper;

    @Mock
    private LoginService loginService;

    @InjectMocks
    private JobSeekerService jobSeekerService;

    private JobSeeker jobSeeker1;
    private User sampleUser;
    private JobSeekerDTO jobSeekerDTO;

    @BeforeEach
    public void sampleData(){
        sampleUser = new User();
        sampleUser.setUsername("john");

        jobSeeker1 = new JobSeeker();
        jobSeeker1.setName("John Doe");
        jobSeeker1.setEmail("john@example.com");
        jobSeeker1.setAddress("123 Main St");
        jobSeeker1.setBio("Software Engineer");
        jobSeeker1.setUser(sampleUser);

        jobSeekerDTO=new JobSeekerDTO(jobSeeker1.getName(),
                                        jobSeeker1.getEmail(),
                                        jobSeeker1.getPhone(),
                                        jobSeeker1.getAddress(),
                                        jobSeeker1.getBio());
    }

    @Test
    public void getAllJobSeekers_ShouldReturnListOfDtos() {
        when(jobSeekerRepository.findAll()).thenReturn(List.of(jobSeeker1));
        when(jobSeekerMapper.EntityToDto(List.of(jobSeeker1))).thenReturn(List.of(jobSeekerDTO));

        List<JobSeekerDTO> result = jobSeekerService.getAllJobSeekers();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().name()).isEqualTo("John Doe");
    }

    @Test
    public void getAllJobSeekers_ShouldReturnException() {
        when(jobSeekerRepository.findAll()).thenReturn(List.of());
        when(jobSeekerMapper.EntityToDto(List.of())).thenReturn(List.of());

        List<JobSeekerDTO> result = jobSeekerService.getAllJobSeekers();

        assertThat(result).hasSize(0);
        assertThat(result.isEmpty());
    }

    @Test
    public  void getProfileByUsername_ShouldReturnProfile(){
        when(loginService.getByUsername("john")).thenReturn(sampleUser);
        when(jobSeekerRepository.findByLogin("john")).thenReturn(Optional.of(jobSeeker1));

        JobSeeker result = jobSeekerService.getProfile("john");

        assertThat(result.getName()).isEqualToIgnoringCase(jobSeeker1.getName());
        verify(loginService, times(1)).getByUsername("john");
        verify(jobSeekerRepository, times(1)).findByLogin("john");
    }

    @Test
    public  void getProfileByUsername_ShouldReturnException(){
        when(loginService.getByUsername("john")).thenReturn(sampleUser);
        when(jobSeekerRepository.findByLogin("john")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> jobSeekerService.getProfile("john"))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Profile not found");

        verify(loginService, times(1)).getByUsername("john");
        verify(jobSeekerRepository, times(1)).findByLogin("john");
    }


    @Test
    public void setJobSeekerProfile_MustSaveAndReturnNothing(){
            when(loginService.getByUsername("john")).thenReturn(sampleUser);
            when(jobSeekerMapper.DtoToEntity(jobSeekerDTO)).thenReturn(jobSeeker1);
            when(jobSeekerRepository.save(jobSeeker1)).thenReturn(jobSeeker1);

            jobSeekerService.setUserProfile(jobSeekerDTO, "john");

            verify(loginService, times(1)).getByUsername("john");
            verify(jobSeekerRepository, times(1)).save(jobSeeker1);

            assertThat(jobSeeker1.getUser()).isEqualTo(sampleUser);
    }

    }
