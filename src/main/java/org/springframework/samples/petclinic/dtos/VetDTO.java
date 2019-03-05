package org.springframework.samples.petclinic.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.samples.petclinic.model.Specialty;

import java.util.Set;

@Setter
@Getter
public class VetDTO {
    private int id;
    private String firstName;
    private String lastName;
    private Set<Specialty> specialties;
}
