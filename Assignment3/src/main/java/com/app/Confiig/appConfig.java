package com.app.Confiig;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@ComponentScan(basePackages = "com.app")
public class appConfig {

    @Bean
    public DataSource getDBConnection() {

        DriverManagerDataSource dataSource =
                new DriverManagerDataSource();

        dataSource.setUrl(
                "jdbc:mysql://localhost:3306/careercrafter");

        dataSource.setUsername("root");

        dataSource.setPassword("jothisha2004");

        dataSource.setDriverClassName(
                "com.mysql.cj.jdbc.Driver");

        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean
    getEntityManagerFactory(DataSource dataSource) {

        LocalContainerEntityManagerFactoryBean emf =
                new LocalContainerEntityManagerFactoryBean();

        emf.setDataSource(dataSource);

        emf.setJpaVendorAdapter(
                new HibernateJpaVendorAdapter());

        emf.setPackagesToScan("com.app.model");

        Properties properties = new Properties();

        properties.setProperty(
                "hibernate.dialect",
                "org.hibernate.dialect.MySQLDialect");

        properties.setProperty(
                "hibernate.hbm2ddl.auto",
                "update");

        emf.setJpaProperties(properties);

        return emf;
    }

    @Bean
    public JpaTransactionManager
    jpaTransactionManager(
            LocalContainerEntityManagerFactoryBean emf) {

        JpaTransactionManager transactionManager =
                new JpaTransactionManager();

        transactionManager.setEntityManagerFactory(
                emf.getObject());

        return transactionManager;
    }
}