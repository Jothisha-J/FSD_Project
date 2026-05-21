package com.configuration;

import com.model.*;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        /* check if factory is null
        if sessionFactory is null, then give it properties to make DB connection
        * */
        if(sessionFactory == null){
            // Map is used to save DB settings
            Configuration configuration = new Configuration();

            // DB credentials , URLs and dialect
            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/CareerCrafter?createDatabaseIfNotExist=true");
            configuration.setProperty("hibernate.connection.username", "root");
            configuration.setProperty("hibernate.connection.password", "jothisha2004");
            configuration.setProperty("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");
            // set the dialect
            configuration.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");

            // If u want hibernate to generate the DB tables on the fly based on Model classes
            configuration.setProperty("hibernate.hbm2ddl.auto", "update");

            // Add model classes that we will create
            configuration.addAnnotatedClass(UserProfile.class);
            configuration.addAnnotatedClass(Login.class);
            configuration.addAnnotatedClass(Skills.class);
            configuration.addAnnotatedClass(JobPost.class);
            configuration.addAnnotatedClass(Employee.class);
            configuration.addAnnotatedClass(Application.class);


            return  configuration.buildSessionFactory();
        }
        return sessionFactory;
    }

    public static void closeFactory(){
        sessionFactory.close();
    }
}
