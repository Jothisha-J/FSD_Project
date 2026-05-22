package com.model;

public class Employee {
    private int id;
    private String company_name;
    private String email;
    private Login login;

    public Employee(String company_name, String email, Login login) {
        this.company_name = company_name;
        this.email = email;
        this.login = login;
    }

    public Employee(int id, String company_name, String email, Login login) {
        this.id = id;
        this.company_name = company_name;
        this.email = email;
        this.login = login;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", company_name='" + company_name + '\'' +
                ", email='" + email + '\'' +
                ", login=" + login +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }
}
