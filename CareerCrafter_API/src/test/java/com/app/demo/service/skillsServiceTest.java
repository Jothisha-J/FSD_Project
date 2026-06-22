package com.app.demo.service;


import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Skills;
import com.app.demo.repository.SkillsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class skillsServiceTest {

    @Mock
    private SkillsRepository skillsRepository;

    @InjectMocks
    private SkillsService skillsService;

    private Skills skills1;
    private Skills skills2;
    private Skills skills3;

    @BeforeEach
    public void sampleDate(){
        skills1=new Skills();
        skills1.setId(1);
        skills1.setSkill_name("Java");

        skills2=new Skills();
        skills2.setId(2);
        skills2.setSkill_name("React");

        skills3=new Skills();
        skills3.setId(3);
        skills3.setSkill_name("Cloud");
    }
    Skills skill=new Skills(4,"Python");


    @Test
    public void getAllSkills_MustReturnSomething(){
    when(skillsRepository.findAll()).thenReturn(List.of(skills1,skills2,skills3));
    List<Skills> skillsList=skillsService.getAllSkills();

    assertThat(skillsList).hasSize(3);
    assertThat(skillsList.getFirst().getSkill_name()).isEqualToIgnoringCase("Java");
    assertThat(skillsList.get(1).getSkill_name()).isEqualToIgnoringCase("React");
    assertThat(skillsList.getLast().getSkill_name()).isEqualToIgnoringCase("cloud");
    }

    @Test
    public void getAllSkills_MustReturnNothing(){
        when(skillsRepository.findAll()).thenReturn(List.of());
        List<Skills> skillsList=skillsService.getAllSkills();

        assertThat(skillsList).hasSize(0);
        assertThat(skillsList.isEmpty());
    }

    @Test
    public void getByID_ReturnsRecord(){
        when(skillsRepository.findById(1)).thenReturn(Optional.of(skills1));
        when(skillsRepository.findById(3)).thenReturn(Optional.of(skills3));

        assertThat(skillsService.getSkillById(1).getId()).isEqualTo(1);
        assertThat(skillsService.getSkillById(1).getSkill_name()).isEqualToIgnoringCase("java");

        assertThat(skillsService.getSkillById(3).getId()).isEqualTo(3);
        assertThat(skillsService.getSkillById(3).getSkill_name()).isEqualToIgnoringCase("cloud");
    }

    @Test
    public void getById_ReturnsException(){
        when(skillsRepository.findById(78)).thenReturn(Optional.empty());

        assertThatThrownBy(()->skillsService.getSkillById(78))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Skills iD");
    }

    @Test
    public void getBySkillName_ReturnsRecord(){
        when(skillsRepository.findBySkill_name("Java")).thenReturn(skills1);

        assertThat(skillsService.getSkillBySkillName("Java").getId()).isEqualTo(1);
        assertThat(skillsService.getSkillBySkillName("Java").getSkill_name()).isEqualToIgnoringCase("java");
    }

    @Test
    public void getBySkillName_ReturnsException(){
        when(skillsRepository.findBySkill_name("IoT")).thenReturn(null);

        assertThat(skillsService.getSkillBySkillName("IoT")).isNull();
    }

    @Test
    public void addSkill_mustAddAndReturnNothing(){
        when(skillsRepository.findById(4)).thenReturn(Optional.of(skill));
        skillsService.addSkill(skill);

        verify(skillsRepository,times(1)).save(skill);

        assertThat(skillsService.getSkillById(4).getId()).isEqualTo(4);
        assertThat(skillsService.getSkillById(4).getSkill_name()).isEqualToIgnoringCase("Python");
    }

    @Test
    public void deleteByID_mustDeleteAndReturnNothing(){
        when(skillsRepository.findById(4)).thenReturn(Optional.empty());

        doNothing().when(skillsRepository).deleteById(4);
        skillsService.deleteSkill(4);

        verify(skillsRepository, times(1)).deleteById(4);
        assertThatThrownBy(()->skillsService.getSkillById(4))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Skills iD");
    }




}
