package com.app.DAO;

import com.app.model.Login;

public interface AuthLoginDAO {

    Login authLogin(String username, String password);

}