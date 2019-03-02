package org.springframework.samples.petclinic.dtos;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;

@Getter
@Setter
public class VisitDTO {
    private int id;
    private LocalDate date;
    private Time startTime;
    private Time endTime;
    private String description;
    private Integer petId;
    private Integer vetId;
}
