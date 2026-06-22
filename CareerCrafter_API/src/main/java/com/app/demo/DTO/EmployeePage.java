package com.app.demo.DTO;

import java.util.List;

public record EmployeePage(
        long totalElements,
        int totalPage,
        List<EmployeeDTO> employeeDTOList
) {
}
