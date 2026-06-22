package com.app.demo.exception;

public class FileInvalidExtensionException extends RuntimeException {
    public FileInvalidExtensionException(String message) {
        super(message);
    }
}
