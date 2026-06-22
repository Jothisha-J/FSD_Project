package com.app.demo.repository;

import com.app.demo.model.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SkillsRepository extends JpaRepository<Skills,Integer> {

    @Query("SELECT s FROM Skills s WHERE s.skill_name = :skillName")
    Skills findBySkill_name(String skillName);
}
