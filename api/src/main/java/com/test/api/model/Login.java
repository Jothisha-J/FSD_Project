package com.test.api.model;

import com.test.api.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class Login implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "invalid username")
    @Column(nullable = false,unique = true)
    private String username;

    @NotNull(message = "invalid password")
    @Column(nullable = false)
    private String password;

    @NotNull(message = "invalid role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleAuth=new SimpleGrantedAuthority(role.toString());
        return List.of(simpleAuth);
    }
}