package com.app.DAOImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.app.DAO.JobPostDAO;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Employee;
import com.app.model.JobPost;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Component
public class JobPostDAOImpl implements JobPostDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void addJob(JobPost jobPost, Employee employee) {

        jobPost.setEmployee(employee);

        entityManager.persist(jobPost);
    }

    @Override
    @Transactional
    public void delete(int id) {

        JobPost jp = entityManager.find(
                JobPost.class,
                Integer.valueOf(id));

        if (jp == null) {

            throw new ResourceNotFoundException(
                    "Invalid Id ...");
        }

        entityManager.remove(jp);
    }

    @Override
    public List<JobPost> FetchAll(int id) {

        String sql =
                "select j from JobPost j where j.employee.id = ?1";

        TypedQuery<JobPost> query =
                entityManager.createQuery(
                        sql,
                        JobPost.class);

        query.setParameter(
                1,
                Integer.valueOf(id));

        return query.getResultList();
    }

    @Override
    public JobPost fetchbyId(int fid) {

        String sql =
                "select j from JobPost j where j.id = ?1";

        TypedQuery<JobPost> query =
                entityManager.createQuery(
                        sql,
                        JobPost.class);

        query.setParameter(
                1,
                Integer.valueOf(fid));

        return query.getSingleResult();
    }
}