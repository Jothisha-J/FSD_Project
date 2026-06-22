package com.app.demo.repository;

import com.app.demo.exception.ResourceNotFoundException;
import com.app.demo.model.JobSeeker;
import com.app.demo.model.Skills;
import com.app.demo.model.UserSkills;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserSkillsRepository extends JpaRepository<UserSkills,Integer> {

    @Query("""
    select s from UserSkills  s  where s.jobSeeker.id=?1
    """)
    Page<UserSkills> getSkillByUserId(int id, Pageable pageable);

    @Query("""
    select s.id from UserSkills  s  where s.Skill.id=?1
    """)
    Optional<Integer> findSkillid(int skillId) ;


    @Query("""
       select us.id
       from UserSkills us
       where us.jobSeeker.id = :userId
       and us.Skill.id = :skillId
       """)
    UserSkills findByUserProfileIdAndSkillId(int id, int skillId);

    long countByJobSeeker(JobSeeker jobSeeker);
}
