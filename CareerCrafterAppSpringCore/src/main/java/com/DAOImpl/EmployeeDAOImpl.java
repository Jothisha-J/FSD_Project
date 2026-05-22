package com.DAOImpl;

import com.DAO.EmployeeDAO;
import com.enums.Role;
import com.exception.ResourceNotFoundException;
import com.model.Employee;
import com.model.Login;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.util.List;

@Component
public class EmployeeDAOImpl implements EmployeeDAO {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insert(Employee employee) {
        String sql="insert into employee(company_name,email,login_id) values(?,?,?)";
        jdbcTemplate.update(sql,employee.getCompany_name(),employee.getEmail(),employee.getLogin().getId());
    }

    @Override
    public void delete(int id) {
        String sql="delete from employee where id=?";
        int row=jdbcTemplate.update(sql,id);
        if(row==0)
            throw new ResourceNotFoundException("Invalid id");
    }

    @Override
    public void update(String email, Login login){
        String sql="Update employee set email=? where login_id=? ";
        int row=jdbcTemplate.update(sql,email,login.getId());
        if(row==0)
            throw new ResourceNotFoundException("Invalid id");
    }
    private RowMapper<Employee> mapper() {

        return (ResultSet rs, int num) -> {

            Login login = new Login(
                    rs.getInt("login_id"),
                    rs.getString("password"),
                    Role.valueOf(rs.getString("role")),
                    rs.getString("username")
            );

            return new Employee(
                    rs.getInt("id"),
                    rs.getString("company_name"),
                    rs.getString("email"),
                    login
            );
        };
    }


    public Employee fetchByEmployee(int id){
        String sql="Select * from employee where id=?";
        return jdbcTemplate.queryForObject(sql,mapper(),id);
    }
}
