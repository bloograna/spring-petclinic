package org.springframework.samples.petclinic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Invalid Format")
public class InvalidFormatException extends RuntimeException {
    public InvalidFormatException(String errorMessage) {
        super(errorMessage);
    }
}
