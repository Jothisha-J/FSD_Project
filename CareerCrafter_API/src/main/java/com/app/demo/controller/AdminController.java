package com.app.demo.controller;

import com.app.demo.DTO.AdminStatsDto;
import com.app.demo.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")

public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public AdminStatsDto getStats() {
        return adminService.getStats();
    }
}