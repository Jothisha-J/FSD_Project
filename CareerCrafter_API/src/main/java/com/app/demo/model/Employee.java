package com.app.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Column(nullable = false)
    private String company_name;
    @NotNull
    @Column(nullable = false)
    private String email;

    @Column(length = 1000)
    private String description;

    @Column
    private String website;

    @Column
    private String industry;

    @Column
    private String location;

    @OneToOne
    private User user;
}