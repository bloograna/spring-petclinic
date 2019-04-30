package org.springframework.samples.petclinic.api.v1.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.model.Specialty;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.repositories.VetRepository;
import org.springframework.samples.petclinic.service.interfaces.VetService;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.Collection;
import java.util.Set;

@Slf4j
@Service
public class VetServiceImpl implements VetService {
    private final VetRepository vets;

    @Autowired
    public VetServiceImpl(VetRepository vets) {
        this.vets = vets;
    }


    @Override
    public ResponseData<Collection<Vet>> getVets() {
        return new ResponseData<>(vets.findAll());
    }

    @Override
    public ResponseData<Vet> getVetById(int vetId) {
        Vet result = vets.findById(vetId);
        if (result != null) {
            return new ResponseData<>(vets.findById(vetId));
        } else {
            throw new InvalidIdException("Invalid vet id, this vet does not exist");
        }
    }

    @Override
    public ResponseData<Vet> saveVet(Vet vet) {
        try {
            // if want to add new visit or vet, id must be null
            // "id" : null
            // this request only completes once from swagger and then the db gets stuck in a transient state that i dont know how to fix >:|
            vets.save(vet);
            return new ResponseData<>(vet);
        } catch (ConstraintViolationException exception) {
            throw new InvalidRequestBodyException("Received bad request body for vet: " + exception.getConstraintViolations());
        }
    }

    @Override
    public ResponseData<Set<Specialty>> getSpecialties() {
        return new ResponseData<>(vets.findSpecialties());
    }

    @Override
    public ResponseData<Vet> addSpecialtyToVet(int vetId, Collection<Specialty> specialties) {
        Vet vet = vets.findById(vetId);
        if (vet != null) {
            specialties.forEach(specialty -> vet.addSpecialty(specialty));
            vets.save(vet);
            return new ResponseData<>(vet);
        } else {
            throw new InvalidIdException("Invalid vet id, this vet does not exist");
        }
    }

}
