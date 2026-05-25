package com.app.DAOImpl;

import org.springframework.stereotype.Component;

import com.app.DAO.AuthLoginDAO;
import com.app.model.Login;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Component
public class AuthLogin implements AuthLoginDAO {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Login authLogin(String username, String password) {

        TypedQuery<Login> query =
                em.createQuery(
                        "select u from Login u where username=:username and password=:password",
                        Login.class);

        query.setParameter("username", username);

        query.setParameter("password", password);

        return query.getSingleResult();
    }
}