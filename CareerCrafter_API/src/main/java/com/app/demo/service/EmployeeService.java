package com.app.demo.service;

import com.app.demo.DTO.EmployeeDTO;
import com.app.demo.DTO.EmployeeOnboardDto;
import com.app.demo.DTO.EmployeePage;
import com.app.demo.DTO.EmployeeStatsDTO;
import com.app.demo.Mapper.EmployeeMapper;
import com.app.demo.enums.Role;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.Employee;
import com.app.demo.model.User;
import com.app.demo.repository.ApplicationRepository;
import com.app.demo.repository.EmployeeRepository;
import com.app.demo.repository.JobPostRepository;
import com.app.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final UserRepository userRepository;
    private final JobPostRepository jobPostRepository;
    private final ApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;


    @Value("${employee.password.temp}")
    private String employeeTempPassword;

    public void addEmployee(EmployeeOnboardDto dto) {
        String username = dto.username();
        // Check username already exists
        if(userRepository.findByUsername(username).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(employeeTempPassword);
        user.setRole(Role.EMPLOYEE);
        user = userRepository.save(user);
        Employee employee = new Employee();
        employee.setCompany_name(dto.companyName());
        employee.setEmail(dto.email());
        employee.setUser(user);

        employeeRepository.save(employee);
    }


    public EmployeePage viewAll(int page, int size) {
        //create Pageable
        Pageable pageable= PageRequest.of(page,size);
        //fetch all records as pages
        Page<Employee> employeePage=employeeRepository.findAll(pageable);
        //convert to list
        List<Employee> employeeList=employeePage.getContent();
        //convert list to dto
        List<EmployeeDTO> employeeDTOS=employeeMapper.EntityToDto(employeeList);
        return new EmployeePage(
                employeePage.getTotalElements(),
                employeePage.getTotalPages(),
                employeeDTOS
        );
    }

    public Employee getEmployeeByID(int id) {
        //return employee
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
    }

    public EmployeeDTO getProfile(String username) {
            Employee employee = employeeRepository.findByLoginUsername(username);
            if (employee == null) {
                throw new ResourceNotFoundException("Employee profile not found for user: " + username);
            }
            return employeeMapper.EntityToDto2(employee);
        }

    public void updateEmployee( EmployeeDTO employee, String username) {
        //fetch old records
        Employee old = employeeRepository.findByLoginUsername(username);
        //update values
        old.setCompany_name(employee.CompanyName());
        old.setEmail(employee.email());
        old.setDescription(employee.description());
        old.setWebsite(employee.website());
        old.setIndustry(employee.industry());
        old.setLocation(employee.location());
        //update changes
        employeeRepository.save(old);
    }


    public EmployeeStatsDTO getStats(String username) {
        Employee employee = employeeRepository.findByLoginUsername(username);

        long totalJobs = jobPostRepository.countByEmployee(employee);
        long activeJobs = jobPostRepository.countActiveByEmployee(employee);
        long inactiveJobs = jobPostRepository.countInactiveByEmployee(employee);
        long totalApplications = applicationRepository.countByJobPost_Employee(employee);

        return new EmployeeStatsDTO(totalJobs, activeJobs, inactiveJobs, totalApplications);
    }
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::EntityToDto2)
                .toList();
    }

    public void deleteEmployee(String email) {
        Employee emp=employeeRepository.getByEmail(email);
        employeeRepository.delete(emp);
    }

    public void changePassword(String username, String currentPassword, String newPassword) {
        Employee employee = employeeRepository.findByLoginUsername(username);
        User user = employee.getUser();

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}