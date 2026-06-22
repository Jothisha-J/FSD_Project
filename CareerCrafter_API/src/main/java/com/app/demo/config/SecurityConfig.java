package com.app.demo.config;

import com.app.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private final JwtFilter jwtFilter;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                        // Login APIs
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/register").permitAll()
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/reset-password/**").permitAll()

                        // JobSeeker APIs
                        .requestMatchers("/api/user/add").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/profile")
                        .hasAnyAuthority("EMPLOYEE","ADMIN","USER")
                        .requestMatchers(HttpMethod.GET, "/api/user/getAll")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/user/update")
                        .hasAuthority("USER")
                        .requestMatchers(HttpMethod.GET,"/api/user/stats")
                        .hasAuthority("USER")

                        // Employee APIs
                        .requestMatchers("/api/employee/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/employee/all/v2")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/employee/profile")
                        .hasAnyAuthority("EMPLOYEE", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/employee/update")
                        .hasAnyAuthority("EMPLOYEE", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/employee/change-password")
                        .hasAuthority("EMPLOYEE")

                        // Skills APIs
                        .requestMatchers(HttpMethod.GET, "/api/skills/all")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/skills/all/list")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/skills/add")
                        .hasAuthority("ADMIN")

                        // User Skills APIs
                        .requestMatchers(HttpMethod.GET, "/api/user-skills/my-skills")
                        .hasAnyAuthority("USER")
                        .requestMatchers(HttpMethod.POST, "/api/user-skills/add")
                        .hasAnyAuthority("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/user-skills/delete/**")
                        .hasAnyAuthority("USER")

                        //auth
                        .requestMatchers("/api/auth/**").authenticated()

                        // Education APIs
                        .requestMatchers("/api/education/**")
                        .hasAnyAuthority("USER")

                        // Experience APIs
                        .requestMatchers("/api/experience/**")
                        .hasAnyAuthority("USER")

                        // Job APIs
                        .requestMatchers(HttpMethod.GET, "/api/jobpost/getAll")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/jobpost/getById/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/jobpost/add")
                        .hasAnyAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/jobpost/update/**")
                        .hasAnyAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.DELETE, "/api/jobpost/delete/**")
                        .hasAnyAuthority("EMPLOYEE", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/jobpost/my-jobs")
                        .hasAnyAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.GET,"/api/jobpost/search")
                        .permitAll()

                        //Appliction APIs
                        .requestMatchers(HttpMethod.POST, "/api/application/add")
                        .hasAuthority("USER")
                        .requestMatchers(HttpMethod.GET, "/api/application/my-applications")
                        .hasAnyAuthority("USER","EMPLOYEE","ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/application/getByJobId/**")
                        .hasAnyAuthority("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/application/getByJobPostId/**")
                        .hasAnyAuthority("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.DELETE, "/api/application/delete/**")
                        .hasAuthority("USER")
                        .requestMatchers(HttpMethod.POST, "/api/application/upload/**")
                        .hasAuthority("USER")
                        .requestMatchers(HttpMethod.PUT, "/api/application/update/**")
                        .hasAnyAuthority("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/application/resume/**")
                        .hasAnyAuthority("ADMIN", "EMPLOYEE","USER")
                        .requestMatchers(HttpMethod.GET,"/resume/application/**")
                        .hasAnyAuthority("ADMIN","USER","EMPLOYEE")

                        //admin API
                        .requestMatchers(HttpMethod.GET, "/api/admin/stats")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/employee/all")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/user/all")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/jobpost/all")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/application/all")
                        .hasAuthority("ADMIN")


                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider dao =
                new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}