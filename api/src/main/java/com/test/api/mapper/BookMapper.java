package com.test.api.mapper;

import com.test.api.dto.BookDto;
import com.test.api.model.Author;
import com.test.api.model.Book;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {


    public Book dtoToEntity(@Valid BookDto dto) {
        Book book=new Book();
        book.setTitle(dto.title());
        book.setSummary(dto.summary());
        return book;

    }
}
