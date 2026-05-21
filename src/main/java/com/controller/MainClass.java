package com.controller;

import com.configuration.HibernateConfig;
import com.exception.ResourceNotFoundException;
import com.model.Login;
import com.model.UserProfile;
import com.service.LoginService;
import com.service.UserProfileService;
import org.hibernate.Session;

import java.util.*;

import static java.lang.System.exit;
import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

public class MainClass {

    public static void main(String[] args) {
        Session session=HibernateConfig.getSessionFactory().openSession();
        UserProfileService userProfileService = new UserProfileService(session);
        LoginService loginService=new LoginService(session);
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Username:");
        String username=sc.nextLine();
        System.out.println("Enter Password:");
        String password=sc.nextLine();
        try {
            Login login = loginService.authLogin(username, password);
            System.out.println(login);
            System.out.println("Welcome " + login.getRole());
            while (true) {
                switch (login.getRole().toString()) {
                    case "USER":
                        //User MAIN Menu
                        System.out.println("____USER MENU____");
                        System.out.println("1. Edit Profile");
                        System.out.println("2. Search Jobs");
                        System.out.println("3. Exit");
                        System.out.println("----------------------");
                        System.out.println("Enter the preferred options: ");
                        int op=sc.nextInt();
                        if (op==3)
                            break;
                        //User Profile Menu
                        if(op==1) {
                            System.out.println("____USER PROFILE MENU____");
                            System.out.println("1. Add User Details.");
                            System.out.println("2. Delete User Details.");
                            System.out.println("3. Update User Details.");
                            System.out.println("4. Review User Details");
                            System.out.println("5. Exit");
                            System.out.println("----------------------");
                            System.out.println("Enter the preferred options: ");
                            int ch = sc.nextInt();
                            if (ch == 0)
                                break;
                            switch (ch) {
                                case 1:
                                    sc.nextLine();
                                    UserProfile userProfile = new UserProfile();
                                    System.out.println("Enter User Name:");
                                    userProfile.setName(sc.nextLine());
                                    System.out.println("Enter User Phone No.:");
                                    userProfile.setPhone(sc.nextLong());
                                    sc.nextLine();
                                    System.out.println("Enter User email:");
                                    userProfile.setEmail(sc.nextLine());
                                    System.out.println("Enter User address:");
                                    userProfile.setAddress(sc.nextLine());
                                    System.out.println("Enter User Bio:");
                                    userProfile.setBio(sc.nextLine());
                                    userProfileService.insert(userProfile);
                                    System.out.println("Inserted successfully");
                                    break;
                                case 2:
                                    System.out.println("Enter User id to be deleted: ");
                                    int id = sc.nextInt();
                                    userProfileService.deleteById(id);
                                    System.out.println("Deleted Record Succesfully");
                                    break;
                                case 3:
                                    System.out.println("Enter id of the User");
                                    int uid = sc.nextInt();
                                    try {
                                        ;
                                        userProfile = userProfileService.getById(uid); //this comes from DB
                                        System.out.println("Existing ticket record  " + userProfile);
                                        sc.nextLine();
                                        System.out.println("Enter User Name:");
                                        userProfile.setName(sc.nextLine());
                                        System.out.println("Enter User Phone No.:");
                                        userProfile.setPhone(sc.nextLong());
                                        sc.nextLine();
                                        System.out.println("Enter User email:");
                                        userProfile.setEmail(sc.nextLine());
                                        System.out.println("Enter User address:");
                                        userProfile.setAddress(sc.nextLine());
                                        System.out.println("Enter User Bio:");
                                        userProfile.setBio(sc.nextLine());
                                        userProfileService.insert(userProfile);
                                        System.out.println("Updated successfully");
                                        break;
                                    } catch (ResourceNotFoundException e) {
                                        System.out.println(e.getMessage());
                                    }
                                    break;
                                case 4:
                                    System.out.println("Enter id of the User");
                                    int pid = sc.nextInt();
                                    try {
                                        ;
                                        userProfile = userProfileService.getById(pid); //this comes from DB
                                        System.out.println("Existing ticket record  " + userProfile);
                                    } catch (ResourceNotFoundException e) {
                                        System.out.println(e.getMessage());
                                    }
                                    break;
                            }

                            //User Job Menu
//                            if(op==2){
//                                System.out.println("____USER JOB MENU___");
//                                System.out.println("1.View All Jobs");
//                                System.out.println("2.View All Applications");






                            }



                    case "EMPLOYEE":
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