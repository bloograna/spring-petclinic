package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.dtos.PetDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;

import java.util.Collection;

public interface PetService {
    ResponseData<String> savePet(PetDTO pet);

    ResponseData<PetDTO> getPetById(int petId);

    ResponseData<Collection<PetDTO>> getPetsByOwnerId(int ownerId);

    ResponseData<Collection<PetType>> getPetTypes();
}
