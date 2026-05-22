package com.appConfig;

import com.enums.Role;
import com.model.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
@Component
public class loginService {

    private final  JdbcTemplate jdbcTemplate ;
    @Autowired
    public loginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public  Login authLogin(String username, String password) {
        String sql="Select * from login where username=? and password=?";
        return jdbcTemplate.queryForObject(sql,mapper(),username,password);
    }

    private  RowMapper<Login> mapper() {
        return(ResultSet rs,int num)->{
                return new Login(rs.getInt("id"),
                        rs.getString("password"),
                        Role.valueOf(rs.getString("role")),
                        rs.getString("username"));
        };
    }
}
