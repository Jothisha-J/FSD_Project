package com.app.demo.controller;

import com.app.demo.DTO.LoginResponseDto;
import com.app.demo.model.User;
import com.app.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    private final UserService userService;

    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(Principal principal){

        User user = (User) userService.loadUserByUsername(
                principal.getName());

        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().toString()
        );
    }
}