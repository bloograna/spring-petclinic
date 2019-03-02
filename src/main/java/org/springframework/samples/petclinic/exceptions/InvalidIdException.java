package org.springframework.samples.petclinic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "ID Not Found")
public class InvalidIdException extends RuntimeException {
    public InvalidIdException(String errorMessage) {
        super(errorMessage);
    }
}
