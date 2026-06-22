package com.app.demo.config;

import com.app.demo.service.UserService;
import com.app.demo.utility.JwtUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtility jwtUtility;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // Skip JWT validation for public endpoints
        if (path.equals("/api/login")
                || path.equals("/api/register")) {

            filterChain.doFilter(request, response);
            return;
        }

        final String authorizationHeader =
                request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        try {

            if (authorizationHeader != null
                    && authorizationHeader.startsWith("Bearer ")) {

                jwt = authorizationHeader.substring(7);
                username = jwtUtility.extractUsername(jwt);
            }

            if (username != null
                    && SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

                UserDetails userDetails =
                        userService.loadUserByUsername(username);

                if (jwtUtility.validateToken(jwt,
                        userDetails.getUsername())) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request));

                    SecurityContextHolder.getContext()
                            .setAuthentication(authToken);
                }
            }

        } catch (Exception e) {
            System.out.println("JWT Error : " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}