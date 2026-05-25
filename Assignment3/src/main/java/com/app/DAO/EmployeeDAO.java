package com.app.DAO;

import com.app.model.Employee;

public interface EmployeeDAO {

    void insert(Employee employee);

    void update(Employee employee);

    void delete(int id);

    Employee fetchDetails(int id);
}