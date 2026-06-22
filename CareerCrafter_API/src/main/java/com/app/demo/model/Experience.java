package com.app.demo.model;

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
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Company name is required")
    @Column(nullable = false)
    private String company_name;

    @NotBlank(message = "Role title is required")
    @Column(nullable = false)
    private String role;

    @Size(max = 255)
    @Column(length = 255)
    private String description;

    @NotNull(message = "Start date is required")
    @Column(nullable = false)
    private LocalDate start_date;

    @Column
    private LocalDate end_date;

    @Column(nullable = false)
    private boolean currently_working;

    @ManyToOne
    private JobSeeker jobSeeker;
}
