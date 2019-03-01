package org.springframework.samples.petclinic.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VisitDTO {
    private LocalDate date;

    private String description;

    private Integer petId;
}
