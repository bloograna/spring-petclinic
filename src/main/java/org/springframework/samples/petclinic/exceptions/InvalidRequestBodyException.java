package org.springframework.samples.petclinic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class InvalidRequestBodyException extends RuntimeException {
    public InvalidRequestBodyException(String errorMessage) {
        super(errorMessage);
    }
}
