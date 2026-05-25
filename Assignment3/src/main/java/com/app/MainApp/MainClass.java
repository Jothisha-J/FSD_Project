package com.app.MainApp;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Scanner;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.app.DAO.AuthLoginDAO;
import com.app.DAO.EmployeeDAO;
import com.app.DAO.JobPostDAO;
import com.app.enums.Role;
import com.app.model.Employee;
import com.app.model.JobPost;
import com.app.model.Login;

public class MainClass {

    public static void main(String[] args) {

        try {

            AnnotationConfigApplicationContext context =
                    new AnnotationConfigApplicationContext("com");

            EmployeeDAO employeeDAO =
                    context.getBean(EmployeeDAO.class);

            AuthLoginDAO authDAO =
                    context.getBean(AuthLoginDAO.class);

            JobPostDAO jobPostDAO =
                    context.getBean(JobPostDAO.class);

            Scanner sc = new Scanner(System.in);

            System.out.println("Enter Username:");
            String username = sc.nextLine();

            System.out.println("Enter Password:");
            String password = sc.nextLine();

            Login login = authDAO.authLogin(username, password);

            System.out.println("Welcome " + login.getRole());

            Role role = login.getRole();

            int ch = -1;

            switch (role.toString()) {

                case "EMPLOYEE":

                    while (ch != 0) {

                        System.out.println("___EMPLOYEE PROFILE MENU____");
                        System.out.println("1. Add Employee Details.");
                        System.out.println("2. Delete Employee Details.");
                        System.out.println("3. Update Employee Details.");
                        System.out.println("4. Review Employee Details");
                        System.out.println("5. Perform Operations on Job Post");
                        System.out.println("0. Exit");
                        System.out.println("----------------------");
                        System.out.println("Enter the preferred options: ");

                        ch = sc.nextInt();

                        Employee employee =
                                employeeDAO.fetchDetails(login.getId());

                        switch (ch) {

                            case 1:

                                sc.nextLine();

                                System.out.println("Enter Company Name: ");
                                String name = sc.nextLine();

                                System.out.println("Enter Email id: ");
                                String email = sc.nextLine();

                                Employee emp =
                                        new Employee(name, email, login);

                                employeeDAO.insert(emp);

                                System.out.println(
                                        "Inserted Data Successfully");

                                break;

                            case 2:

                                System.out.println(
                                        "Enter id to be deleted: ");

                                int did = sc.nextInt();

                                employeeDAO.delete(did);

                                System.out.println(
                                        "Deleted successfully");

                                break;

                            case 3:

                                System.out.println(
                                        "Enter Email to be Updated: ");

                                String email_update = sc.next();

                                employee.setEmail(email_update);

                                employeeDAO.update(employee);

                                System.out.println(
                                        "Updated successfully");

                                break;

                            case 4:

                                System.out.println("ALL DETAILS");

                                System.out.println(employee);

                                break;

                            case 5:

                                int op = -1;

                                while (op != 0) {

                                    System.out.println(
                                            "___JOB POST MENU____");

                                    System.out.println(
                                            "1. Add Job Post.");

                                    System.out.println(
                                            "2. Delete Job Post.");

                                    System.out.println(
                                            "3. Update Job Post.");

                                    System.out.println(
                                            "4. Review Job Post By You");

                                    System.out.println(
                                            "5. Review Job Post By Id");

                                    System.out.println("0. Exit");

                                    System.out.println(
                                            "----------------------");

                                    op = sc.nextInt();

                                    switch (op) {

                                        case 1:

                                            JobPost jobPost =
                                                    new JobPost();

                                            sc.nextLine();

                                            System.out.println(
                                                    "Enter Job Title: ");

                                            jobPost.setTitle(
                                                    sc.nextLine());

                                            System.out.println(
                                                    "Enter Location: ");

                                            jobPost.setLocation(
                                                    sc.nextLine());

                                            System.out.println(
                                                    "Enter Job Type: ");

                                            jobPost.setJobType(
                                                    sc.nextLine());

                                            System.out.println(
                                                    "Enter Experience (years): ");

                                            jobPost.setExperience(
                                                    Integer.valueOf(
                                                            sc.nextInt()));

                                            sc.nextLine();

                                            System.out.println(
                                                    "Enter Job Description: ");

                                            jobPost.setDescription(
                                                    sc.nextLine());

                                            System.out.println(
                                                    "Enter Skills Required: ");

                                            jobPost.setSkillsRequired(
                                                    sc.nextLine());

                                            System.out.println(
                                                    "Enter Minimum Salary: ");

                                            jobPost.setSalaryMin(
                                                    Double.valueOf(
                                                            sc.nextDouble()));

                                            System.out.println(
                                                    "Enter Maximum Salary: ");

                                            jobPost.setSalaryMax(
                                                    Double.valueOf(
                                                            sc.nextDouble()));

                                            sc.nextLine();

                                            jobPost.setPostedOn(
                                                    LocalDate.now());

                                            System.out.println(
                                                    "Enter Last Date (yyyy-mm-dd): ");

                                            String lastDate =
                                                    sc.nextLine();

                                            jobPost.setLastDate(
                                                    LocalDate.parse(lastDate));

                                            jobPostDAO.addJob(
                                                    jobPost,
                                                    employee);

                                            System.out.println(
                                                    "Job Posted Successfully");

                                            break;

                                        case 2:

                                            System.out.println(
                                                    "Enter job Post id to be deleted: ");

                                            int id = sc.nextInt();

                                            jobPostDAO.delete(id);

                                            System.out.println(
                                                    "Job Post Deleted successfully");

                                            break;

                                        case 4:

                                            System.out.println(
                                                    "Jobs Posted By You");

                                            Objects.requireNonNull(
                                                            jobPostDAO.FetchAll(
                                                                    employee.getId()))
                                                    .forEach(System.out::println);

                                            break;

                                        case 5:

                                            System.out.println(
                                                    "Enter job Post id to be fetched: ");

                                            int fid = sc.nextInt();

                                            System.out.println(
                                                    jobPostDAO.fetchbyId(fid));

                                            break;

                                        case 0:

                                            break;

                                        default:

                                            System.out.println(
                                                    "Invalid Option");
                                    }
                                }

                                break;

                            case 0:

                                System.out.println("Exited");

                                break;

                            default:

                                System.out.println(
                                        "Invalid Option");
                        }
                    }

                    break;

                case "ADMIN":

                    System.out.println(
                            "ADMIN MODULE NOT IMPLEMENTED");

                    break;

                case "USER":

                    System.out.println(
                            "USER MODULE NOT IMPLEMENTED");

                    break;

                default:

                    System.out.println("INVALID ROLE");
            }

            sc.close();
            context.close();

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}