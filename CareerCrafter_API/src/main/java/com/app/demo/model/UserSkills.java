package com.app.demo.model;

import com.app.demo.enums.Proficiency;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private JobSeeker jobSeeker;

    @ManyToOne
    private Skills Skill;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Proficiency proficiency;

    @Column
    @NotNull(message = "Atleast one certification required...")
    private String certification;



}
