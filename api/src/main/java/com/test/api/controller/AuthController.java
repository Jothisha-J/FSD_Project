package com.test.api.controller;

import com.test.api.dto.LoginResponseDto;
import com.test.api.dto.TokenDto;
import com.test.api.model.Login;
import com.test.api.service.UserService;
import com.test.api.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtility jwtUtility;

    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }

    // this is for later
    @GetMapping("/user-details")
    public LoginResponseDto getUserDetails(Principal principal){
        Login user = (Login)userService.loadUserByUsername(principal.getName());
        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().toString()
        );
    }
}