package com.app.demo.repository;

import com.app.demo.DTO.SkillJobCountDTO;
import com.app.demo.enums.JobType;
import com.app.demo.model.Employee;
import com.app.demo.model.JobPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.*;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface JobPostRepository extends JpaRepository<JobPost,Integer> {

    @Query("""

            select j from JobPost j where j.employee.id=?1
    """)
    Page<JobPost> getByEmpId(int id, Pageable pageable);


    @Query("""

            SELECT
            new com.app.demo.DTO.SkillJobCountDTO(j.skills.skill_name, COUNT(j), COUNT(a))
            FROM JobPost j
            LEFT JOIN Application a
            ON
            a.jobPost = j
            WHERE j.skills IS NOT NULL
            GROUP BY j.skills.skill_name
        """
    )
    List<SkillJobCountDTO> countJobsBySkill();

    long countByEmployee(Employee employee);

    @Query("SELECT COUNT(j) FROM JobPost j WHERE j.employee = ?1 AND j.last_date >= CURRENT_DATE")
    long countActiveByEmployee(Employee employee);

    @Query("SELECT COUNT(j) FROM JobPost j WHERE j.employee = ?1 AND j.last_date < CURRENT_DATE")
    long countInactiveByEmployee(Employee employee);

    @Query("SELECT COUNT(j) FROM JobPost j WHERE j.last_date >= CURRENT_DATE")
    long countActiveJobs();

    @Query("SELECT COUNT(j) FROM JobPost j WHERE j.last_date < CURRENT_DATE")
    long countInactiveJobs();

    @Query("""
    SELECT j FROM JobPost j
    LEFT JOIN j.skills s
    WHERE (:keyword IS NULL OR :keyword='' OR
    LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(j.skills_required) LIKE LOWER(CONCAT('%', :keyword, '%')))
    AND (:jobType IS NULL OR j.job_type = :jobType)
    AND (:skillId IS NULL OR s.id = :skillId)
    AND (:minExp IS NULL OR j.experience >= :minExp)
    AND (:maxExp IS NULL OR j.experience <= :maxExp)
    AND (:salaryMin IS NULL OR j.salary_min >= :salaryMin)
    AND (:salaryMax IS NULL OR j.salary_max <= :salaryMax)
    ORDER BY j.posted_on DESC
    """)
    Page<JobPost> searchJobs(
            String keyword,
            JobType jobType,
            Integer skillId,
            Integer minExp,
            Integer maxExp,
            Double salaryMin,
            Double salaryMax,
            Pageable pageable
    );

}