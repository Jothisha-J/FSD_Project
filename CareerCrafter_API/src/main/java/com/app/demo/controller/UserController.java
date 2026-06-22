package com.app.demo.controller;

import com.app.demo.DTO.TokenDto;
import com.app.demo.model.User;
import com.app.demo.service.LoginService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final LoginService loginService;

    @PostMapping("/register")
    public TokenDto register(@Valid @RequestBody User user) {
        return loginService.register(user);
    }

    @PostMapping("/login")
    public TokenDto login(@RequestBody User user) {
        return loginService.login(user);
    }

    @PostMapping("/reset-password/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        boolean exists = loginService.verifyEmail(email);
        if (exists) return ResponseEntity.ok().build();
        return ResponseEntity.status(404).body("Email not found");
    }

    @PostMapping("/reset-password/reset")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {

        loginService.resetPassword(email, newPassword);
        return ResponseEntity.ok().build();
    }

}