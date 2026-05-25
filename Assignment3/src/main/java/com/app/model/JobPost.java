package com.app.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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

    @Column(nullable = false)
    private LocalDate lastDate;

    @ManyToOne
    @JoinColumn
    private Employee employee;

    @ManyToOne
    @JoinColumn
    private Skills skills;

    // Default constructor
    public JobPost() {
    }

    // Full constructor
    public JobPost(
            Integer id,
            String title,
            String location,
            String jobType,
            Integer experience,
            String description,
            String skillsRequired,
            Double salaryMin,
            Double salaryMax,
            LocalDate postedOn,
            LocalDate lastDate,
            Employee employee,
            Skills skills) {

        this.id = id;
        this.title = title;
        this.location = location;
        this.jobType = jobType;
        this.experience = experience;
        this.description = description;
        this.skillsRequired = skillsRequired;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.postedOn = postedOn;
        this.lastDate = lastDate;
        this.employee = employee;
        this.skills = skills;
    }

    // Getters and Setters

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

    // (all fields)

    @Override
    public String toString() {
        return "JobPost{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", location='" + location + '\'' +
                ", jobType='" + jobType + '\'' +
                ", experience=" + experience +
                ", description='" + description + '\'' +
                ", skillsRequired='" + skillsRequired + '\'' +
                ", salaryMin=" + salaryMin +
                ", salaryMax=" + salaryMax +
                ", postedOn=" + postedOn +
                ", lastDate=" + lastDate +
                ", employee=" + employee +
                ", skills=" + skills +
                '}';
    }
}