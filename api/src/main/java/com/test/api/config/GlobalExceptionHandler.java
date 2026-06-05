package com.test.api.config;

import com.test.api.exception.*;
import com.test.api.utility.ResponseUtility;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {

    private ResponseUtility responseUtility;

    //handler method
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseUtility> handleResourceNotFoundException(
            ResourceNotFoundException e
    ) {
        responseUtility.setMessage(e.getMessage());
        return ResponseEntity
                .badRequest()
                .body(responseUtility);
    }
}
