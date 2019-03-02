package org.springframework.samples.petclinic.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.samples.petclinic.model.PetType;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class PetDTO {
    private int id;
    private int ownerId;
    private String name;
    private LocalDate birthDate;
    private PetType type;
    private Set<VisitDTO> visits;
}
