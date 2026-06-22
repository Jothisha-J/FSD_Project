package com.app.demo.model;

import com.app.demo.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    private String resume;

    @ManyToOne
    private JobSeeker jobSeeker;

    @ManyToOne
    private JobPost jobPost;

}