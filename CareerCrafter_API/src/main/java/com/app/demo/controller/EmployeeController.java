package com.app.demo.controller;

import com.app.demo.DTO.EmployeeDTO;
import com.app.demo.DTO.EmployeeOnboardDto;
import com.app.demo.DTO.EmployeePage;
import com.app.demo.DTO.EmployeeStatsDTO;
import com.app.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")

public class EmployeeController {

    private final EmployeeService employeeService;

    //add a new employee
    @PostMapping("/add")
    public void addEmployee(@RequestBody EmployeeOnboardDto employee) {
        System.out.println("CONTROLLER HIT");
        employeeService.addEmployee(employee);
    }

    //fetch the profile
    @GetMapping("/profile")
    public EmployeeDTO getProfile(Principal principal) {
        return employeeService.getProfile(principal.getName());
    }

    @GetMapping("/all/v2")
    public EmployeePage viewAll(@RequestParam(defaultValue ="0" ,required = false) int page,
                                @RequestParam(defaultValue ="0" ,required = false) int size) {
        return employeeService.viewAll(page,size);
    }

    //update employee details
    @PutMapping("/update")
    public void updateEmployee(@RequestBody EmployeeDTO employee, Principal principal) {
        employeeService.updateEmployee(employee, principal.getName());
    }

    @DeleteMapping("/delete/{email}")
    public void deleteEmployee(@PathVariable String email){
        employeeService.deleteEmployee(email);
    }

    @GetMapping("/stats")
    public EmployeeStatsDTO getStats(Principal principal) {
        return employeeService.getStats(principal.getName());
    }

    @GetMapping("/all")
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam String currentPassword,
            @RequestParam String newPassword,
            Principal principal) {
        employeeService.changePassword(principal.getName(), currentPassword, newPassword);
        return ResponseEntity.ok().build();
    }
}