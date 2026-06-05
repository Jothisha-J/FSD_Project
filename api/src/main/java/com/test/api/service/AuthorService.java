package com.test.api.service;

import com.test.api.exception.ResourceNotFoundException;
import com.test.api.model.Author;
import com.test.api.repository.AuthorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public Author findAuthorByID(int id) {
        return authorRepository.findById(id).
                orElseThrow(()->new ResourceNotFoundException("Invalid Author Id"));
    }
}
