package com.app;

import com.DAOImpl.EmployeeDAOImpl;
import com.appConfig.loginService;
import com.exception.ResourceNotFoundException;
import com.model.Employee;
import com.model.Login;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Scanner;

public class MainApp {

public static void main(String[]args){
     AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext("com");
     loginService loginService=context.getBean(loginService.class);
     EmployeeDAOImpl employeeDAOImpl=context.getBean(EmployeeDAOImpl.class);
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Username:");
        String username=sc.nextLine();
        System.out.println("Enter Password:");
        String password=sc.nextLine();
        try {
                Login login = loginService.authLogin(username, password);
                System.out.println("Welcome " + login.getRole());
                while (true) {
                        switch (login.getRole().toString()) {
                                case "USER":
                                        break;
                                case "EMPLOYEE":
                                        System.out.println("___EMPLOYEE PROFILE MENU____");
                                        System.out.println("1. Add Employee Details.");
                                        System.out.println("2. Delete Employee Details.");
                                        System.out.println("3. Update Employee Details.");
                                        System.out.println("4. Review Employee Details");
                                        System.out.println("5. Exit");
                                        System.out.println("----------------------");
                                        System.out.println("Enter the preferred options: ");
                                        int ch = sc.nextInt();
                                        switch (ch){
                                            case 1:
                                                sc.nextLine();
                                                System.out.println("Enter Company Name: ");
                                                String name=sc.nextLine();
                                                System.out.println("Enter Email id: ");
                                                String email=sc.nextLine();
                                                employeeDAOImpl.insert(
                                                        new Employee(name,email,login)
                                                );
                                                System.out.println("Inserted Data Succesfully");
                                                break;
                                            case 2:
                                                System.out.println("Enter id to be deleted: ");
                                                int id=sc.nextInt();
                                                employeeDAOImpl.delete(id);
                                                System.out.println("Deleted succesfully");
                                                break;
                                            case 3:
                                                System.out.println("Enter Email to be Updated: ");
                                                String email_update=sc.next();
                                                employeeDAOImpl.update(email_update,login);
                                                break;
                                            case 4:

                                        }
                                        break;

                                case "ADMIN":
                        }
                }
        }
        catch(Exception e){
                e.printStackTrace();
        }
}
}
