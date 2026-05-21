package com.service;

import com.exception.ResourceNotFoundException;
import com.model.UserProfile;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class UserProfileService {
    private final  Session session;

    public UserProfileService(Session session) {
        this.session=session;
    }

    public void insert(UserProfile userProfile) {
        Transaction tx=session.beginTransaction();
        session.persist(userProfile);
        tx.commit();
    }

    public void deleteById(int id) {

        Transaction tx=session.beginTransaction();
        UserProfile userProfile=session.find(UserProfile.class,id);
        if(userProfile==null)
        {
            tx.commit();
            throw new ResourceNotFoundException("Invalid User Id");
        }

        session.createMutationQuery("delete from UserProfile where id=:id").setParameter("id",id).executeUpdate();
        tx.commit();

    }

    public List<UserProfile> getAllUserProfile() {
    Transaction tx=session.beginTransaction();
    List<UserProfile> list=session.createQuery("from UserProfile ",UserProfile.class).list();
    tx.commit();
    return  list;
    }

    public UserProfile getById(int id) {
        Transaction tx = session.beginTransaction();
        UserProfile userProfile = session.find(UserProfile.class, id);
        tx.commit();
        if(userProfile == null)
            throw new ResourceNotFoundException("Invalid ID given..");

        return userProfile;

    }
}
