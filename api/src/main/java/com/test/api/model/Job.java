package com.test.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Invalid title")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Invalid description")
    @Column(nullable = false)
    private String description;

    private String location;

    @NotNull(message = "Invalid salary")
    private Double salary;

    @ManyToOne
    private Employer employer;
}