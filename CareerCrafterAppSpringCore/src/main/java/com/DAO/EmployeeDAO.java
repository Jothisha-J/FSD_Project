package com.DAO;

import com.model.Employee;
import com.model.Login;

import java.util.List;

public interface EmployeeDAO {

    public void insert(Employee employee);
    public void delete(int id);
    public void update(String email, Login login);
    public Employee fetchByEmployee(int id);

}
