package com.test.api.repository;

import com.test.api.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepsitory extends JpaRepository<Book,Integer> {
}
