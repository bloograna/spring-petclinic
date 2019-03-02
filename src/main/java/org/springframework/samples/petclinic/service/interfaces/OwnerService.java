package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.dtos.OwnerDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;

import java.util.Collection;

public interface OwnerService {

    ResponseData<Collection<OwnerDTO>> findOwnerByLastName(String lastName);

    ResponseData<String> saveOwner(OwnerDTO ownerDTO);

}
