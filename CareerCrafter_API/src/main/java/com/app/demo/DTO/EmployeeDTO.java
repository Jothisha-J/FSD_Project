package com.app.demo.DTO;

public record EmployeeDTO(
        int id,
        String CompanyName,
        String email,
        String description,
        String website,
        String industry,
        String location
) {
}