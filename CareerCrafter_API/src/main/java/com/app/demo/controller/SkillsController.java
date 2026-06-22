package com.app.demo.controller;


import com.app.demo.DTO.SkillPage;
import com.app.demo.model.Skills;
import com.app.demo.service.SkillsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class SkillsController {

    private final SkillsService skillsService;

    //add Skills as RequestBody
    @PostMapping("/api/skills/add")
    public void addSkill(@RequestBody Skills skill){
        skillsService.addSkill(skill);
    }

    @GetMapping("/api/skills/all")
    public SkillPage getAll(@RequestParam(defaultValue = "0", required = false) int page,
                            @RequestParam(defaultValue = "10", required = false) int size){
        return skillsService.getAll(page,size);
    }

    @DeleteMapping("/api/skills/delete/{id}")
    public void deleteSkill(@PathVariable int id){
        skillsService.deleteSkill(id);
    }

    @GetMapping("/api/skills/all/list")
    public List<Skills> getAllSkills(){
        return skillsService.getAllSkills();
    }

}
