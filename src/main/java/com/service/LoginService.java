package com.service;

import com.model.Login;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class LoginService {
    private final Session session;

    public LoginService(Session session) {
        this.session = session;
    }

    public Login authLogin(String username, String password) {
        Transaction tx = session.beginTransaction();
        Login login = session.createQuery("from Login where username=:username and password=:password", Login.class)
                .setParameter("username", username)
                .setParameter("password", password)
                .getSingleResult();
        tx.commit();
        return login;
    }
}
