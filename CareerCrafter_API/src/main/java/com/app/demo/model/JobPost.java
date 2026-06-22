package com.app.demo.model;

import com.app.demo.enums.JobType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Job title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Job type is required")
    @Column(nullable = false)
    private JobType job_type;

    @NotNull(message = "Experience requirement is required")
    private int experience;

    @Size(max = 255)
    @Column(length = 255)
    private String description;

    @Column
    private String skills_required;

    @Column
    private double salary_min;

    @Column
    private double salary_max;

    @NotNull(message = "Posted date is required")
    @Column( nullable = false)
    private LocalDate posted_on;

    @Column
    private LocalDate last_date;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Skills skills;
}
