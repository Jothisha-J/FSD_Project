package com.app.demo.controller;

import com.app.demo.DTO.UserSkillDto;
import com.app.demo.DTO.UserSkillPage;
import com.app.demo.service.UserSkillsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user-skills")
@CrossOrigin(origins = "http://localhost:5173")


public class UserSkillsController {

    private final UserSkillsService userSkillsService;

    //fetch user logged in skills
    @GetMapping("/my-skills")
    public UserSkillPage getMySkills(Principal principal,
                                     @RequestParam(defaultValue = "0", required = false) int page,
                                     @RequestParam(defaultValue = "10", required = false) int size) {
        return userSkillsService.getMySkills(principal.getName(),page,size);
    }

    //add new skills
    @PostMapping("/add")
    public void addSkill(@RequestBody UserSkillDto dto, Principal principal) {
        userSkillsService.addUserSkill(principal.getName(), dto);
    }

    //delete a skill
    @DeleteMapping("/delete/{skillId}")
    public void deleteSkill(@PathVariable int skillId, Principal principal) {
        userSkillsService.deleteSkill(principal.getName(), skillId);
    }
}