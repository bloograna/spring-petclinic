package org.springframework.samples.petclinic.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OwnerDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String telephone;
}
