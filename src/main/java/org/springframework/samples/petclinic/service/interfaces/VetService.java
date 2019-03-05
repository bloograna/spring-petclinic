package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.model.Specialty;
import org.springframework.samples.petclinic.model.Vet;

import java.util.Collection;
import java.util.Set;


public interface VetService {

    ResponseData<Collection<Vet>> getVets();

    ResponseData<Vet> getVetById(int vetId);

    ResponseData<String> saveVet(Vet vet);

    ResponseData<Set<Specialty>> getSpecialties();

    ResponseData<String> addSpecialtyToVet(int vetId, Collection<Specialty> specialty);
}
