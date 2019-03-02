package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.dtos.VetDTO;
import org.springframework.samples.petclinic.model.Specialty;

import java.util.Collection;
import java.util.Set;


public interface VetService {

    ResponseData<Collection<VetDTO>> getVets();

    ResponseData<VetDTO> getVetById(int vetId);

    ResponseData<String> saveVet(VetDTO vet);

    ResponseData<Set<Specialty>> getSpecialties();
}
