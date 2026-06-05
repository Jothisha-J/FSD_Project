package com.test.api.config;

import com.test.api.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
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
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                        // Login APIs
                        .requestMatchers("/api/login/new").permitAll()
                        .requestMatchers("/api/login").permitAll()

                        //employer
                        .requestMatchers("/api/add/employer").hasAnyAuthority("EMPLOYER")

                        //jobPost
                        .requestMatchers(HttpMethod.POST,"/api/jobs/add").hasAnyAuthority("EMPLOYER")
                        .requestMatchers(HttpMethod.GET,"/api/jobs/getAll").hasAnyAuthority("EMPLOYER","JOBSEEKER")

                        //book
                        .requestMatchers(HttpMethod.POST,"/api/book/add").permitAll()

                        //jobSeeker
                        .requestMatchers(HttpMethod.POST,"/api/seeker/add").hasAnyAuthority("JOBSEEKER")

                        //application
                        .requestMatchers(HttpMethod.POST,"/api/application/add/**").hasAnyAuthority("JOBSEEKER")

                        //auth
                        .requestMatchers("/api/auth/**").authenticated()


                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.httpBasic(Customizer.withDefaults()); //notifying Spring that  Basic Auth technique is used

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider dao =
                new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }
}