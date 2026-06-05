package com.test.api.service;

import com.test.api.dto.BookDto;
import com.test.api.mapper.BookMapper;
import com.test.api.model.Author;
import com.test.api.model.Book;
import com.test.api.repository.BookRepsitory;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookServicee {

    private final AuthorService authorService;
    private final BookRepsitory bookRepsitory;
    private final BookMapper bookMapper;

    public void addBook(int id, @Valid BookDto dto) {
    //validate the auth id
    Author author= authorService.findAuthorByID(id);
    //convert the dto to entity and insert record
        Book book=bookMapper.dtoToEntity(dto);
        book.setAuthor(author);
        bookRepsitory.save(book);
    }
}
