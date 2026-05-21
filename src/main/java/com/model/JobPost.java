package com.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class JobPost {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(nullable = false)
        private String title;

        @Column(nullable = false)
        private String location;

        @Column(nullable = false)
        private String jobType;

        @Column(nullable = false)
        private Integer experience;

        @Column(nullable = false)
        private String description;

        @Column(nullable = false)
        private String skillsRequired;

        @Column(nullable = false)
        private Double salaryMin;

        @Column(nullable = false)
        private Double salaryMax;

        @Column(nullable = false)
        private LocalDate postedOn;


        private LocalDate lastDate;

        @ManyToOne
        @JoinColumn(nullable = false)
        private Employee employee;

        @ManyToOne
        private Skills skills;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public Double getSalaryMin() {
        return salaryMin;
    }

    public void setSalaryMin(Double salaryMin) {
        this.salaryMin = salaryMin;
    }

    public Double getSalaryMax() {
        return salaryMax;
    }

    public void setSalaryMax(Double salaryMax) {
        this.salaryMax = salaryMax;
    }

    public LocalDate getPostedOn() {
        return postedOn;
    }

    public void setPostedOn(LocalDate postedOn) {
        this.postedOn = postedOn;
    }

    public LocalDate getLastDate() {
        return lastDate;
    }

    public void setLastDate(LocalDate lastDate) {
        this.lastDate = lastDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Skills getSkills() {
        return skills;
    }

    public void setSkills(Skills skills) {
        this.skills = skills;
    }
}
