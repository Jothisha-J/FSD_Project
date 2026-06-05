package com.test.api.service;

import com.test.api.dto.TokenDto;
import com.test.api.enums.Role;
import com.test.api.exception.ResourceNotFoundException;
import com.test.api.model.Login;
import com.test.api.repository.LoginRepository;
import com.test.api.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    private final LoginRepository loginRepository;
    private final JwtUtility jwtUtility;
    private final PasswordEncoder passwordEncoder;

    //add new Login
    public TokenDto newLogin(Login login) {
        // Step 1: Extract user info:  username.password from dto
        String username = login.getUsername();
        String password = login.getPassword();
        Role role = login.getRole();
        // Step 2: Encode the password and assign Role
        String encodedPassword = passwordEncoder.encode(password);
        Login user = new Login();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        // Step 3: Save the user in DB
        user = loginRepository.save(user);
        return new TokenDto(username, jwtUtility.generateToken(username));
    }

    public  Login getByUsername(String username){

        return loginRepository.findByUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("Username Invalid"));
    }


}



