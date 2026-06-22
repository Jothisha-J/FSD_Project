package com.app.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Institution must not be blank")
    @Column(nullable = false)
    private String institution;

    @NotBlank(message = "Degree must not be blank")
    @Column(nullable = false)
    private String degree;

    @NotBlank(message = "Field of study must not be blank")
    @Column
    private String fieldOfStudy;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column(nullable = false)
    private boolean currentlyPursuing;

    @ManyToOne
    private JobSeeker jobSeeker;

}