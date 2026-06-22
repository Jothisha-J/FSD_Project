package com.app.demo.service;

import com.app.demo.DTO.TokenDto;
import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.User;
import com.app.demo.repository.UserProfileRepository;
import com.app.demo.repository.UserRepository;
import com.app.demo.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final JwtUtility jwtUtility;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileRepository userProfileRepository;

    public TokenDto register(User user) {

        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        String token = jwtUtility.generateToken(savedUser.getUsername());

        return new TokenDto(savedUser.getUsername(), token);
    }

    public TokenDto login(User loginRequest) {

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Username"));

        boolean matches = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if(!matches){
            throw new ResourceNotFoundException("Invalid Password");
        }

        String token = jwtUtility.generateToken(user.getUsername());

        return new TokenDto(user.getUsername(), token);
    }

    public User getByUsername(String username){
        
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Username Invalid"));
    }


    public boolean verifyEmail(String email) {
        return userProfileRepository.existsByEmail(email);
    }

    public void resetPassword(String email, String newPassword) {
        JobSeeker jobSeeker = userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email not found"));
        User user = jobSeeker.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}