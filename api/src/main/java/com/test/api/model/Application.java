package com.test.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate appliedAt;

    @ManyToOne
    private JobSeeker jobSeeker;

    @ManyToOne
    private Job job;
}