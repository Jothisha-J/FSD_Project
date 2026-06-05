package com.test.api.controller;

import com.test.api.dto.TokenDto;
import com.test.api.model.Login;
import com.test.api.service.LoginService;
import com.test.api.utility.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final JwtUtility jwtUtility;

    @GetMapping("/api/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username, token);
    }

    @PostMapping("/api/login/new")
    public TokenDto newLogin(@Valid @RequestBody Login login){
        return loginService.newLogin(login);
    }
}