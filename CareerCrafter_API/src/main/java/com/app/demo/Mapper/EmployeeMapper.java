package com.app.demo.Mapper;

import com.app.demo.DTO.EmployeeDTO;
import com.app.demo.model.Employee;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeMapper {

    //works for employee list
    public List<EmployeeDTO> EntityToDto(List<Employee> employees){
        return employees.stream().map(employee ->
                new EmployeeDTO(
                        employee.getId(),
                        employee.getCompany_name(),
                        employee.getEmail(),
                        employee.getDescription(),
                        employee.getWebsite(),
                        employee.getIndustry(),
                        employee.getLocation()
                )
        ).toList();
    }

    //works for employee
    public EmployeeDTO EntityToDto2(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getCompany_name(),
                employee.getEmail(),
                employee.getDescription(),
                employee.getWebsite(),
                employee.getIndustry(),
                employee.getLocation()
        );
    }

    public Employee dtoToEntity(EmployeeDTO employee) {
        Employee employee1=new Employee();
        employee1.setCompany_name(employee.CompanyName());
        employee1.setEmail(employee.email());
        employee1.setDescription(employee.description());
        employee1.setWebsite(employee.website());
        employee1.setIndustry(employee.industry());
        employee1.setLocation(employee.location());
        return employee1;
    }
}