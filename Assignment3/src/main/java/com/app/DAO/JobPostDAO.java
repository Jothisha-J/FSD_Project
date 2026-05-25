package com.app.DAO;

import java.util.List;

import com.app.model.Employee;
import com.app.model.JobPost;

public interface JobPostDAO {

    void addJob(JobPost jobPost, Employee employee);

    void delete(int id);

    List<JobPost> FetchAll(int id);

    JobPost fetchbyId(int id);
}