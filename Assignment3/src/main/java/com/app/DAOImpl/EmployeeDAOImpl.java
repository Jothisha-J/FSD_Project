package com.app.DAOImpl;

import org.springframework.stereotype.Component;

import com.app.DAO.EmployeeDAO;
import com.app.model.Employee;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

@Component
public class EmployeeDAOImpl implements EmployeeDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void insert(Employee employee) {

        entityManager.persist(employee);
    }

    @Override
    @Transactional
    public void update(Employee employee) {

        entityManager.merge(employee);
    }

    @Override
    @Transactional
    public void delete(int id) {

        entityManager.remove(fetchDetails(id));
    }

    @Override
    public Employee fetchDetails(int id) {

        TypedQuery<Employee> query =
                entityManager.createQuery(
                        "select E from Employee E where E.login.id=:id",
                        Employee.class);

        query.setParameter(
                "id",
                Integer.valueOf(id));

        return query.getSingleResult();
    }
}