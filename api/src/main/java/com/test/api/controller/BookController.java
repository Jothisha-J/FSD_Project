package com.test.api.controller;

import com.test.api.dto.BookDto;
import com.test.api.service.BookServicee;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class BookController {

    private final BookServicee bookService;

    @PostMapping("/api/book/add/{id}")
    public void addBook(@PathVariable int id, @Valid @RequestBody BookDto dto){
        bookService.addBook(id,dto);
    }

}
