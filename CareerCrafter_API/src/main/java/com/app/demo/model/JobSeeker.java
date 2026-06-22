package com.app.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_profile")
public class JobSeeker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @NotBlank
    @Column(nullable = false)
    private String name;
    @NotNull
    @Column(nullable = false, length = 10)
    private long phone;
    @NotNull
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String address;
    @Column(length = 1000)
    private String bio;
    @OneToOne
    private User user;
}
