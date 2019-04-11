package org.springframework.samples.petclinic.api.v1.services;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.repositories.OwnerRepository;
import org.springframework.samples.petclinic.repositories.PetRepository;
import org.springframework.samples.petclinic.service.interfaces.PetService;
import org.springframework.samples.petclinic.dtos.PetDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Service
public class PetServiceImpl implements PetService {
    private final PetRepository pets;
    private final OwnerRepository owners;
    private final ModelMapper modelMapper;

    @Autowired
    public PetServiceImpl(PetRepository pets, OwnerRepository owners, ModelMapper modelMapper) {
        this.pets = pets;
        this.owners = owners;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseData<PetDTO> savePet(PetDTO petDTO) {
        Owner owner = owners.findById(petDTO.getOwnerId());
        if (owner != null) {
            try {
                Pet pet = modelMapper.map(petDTO, Pet.class);
                owner.addPet(pet);
                pets.save(pet);
            } catch (ConstraintViolationException exception) {
                throw new InvalidRequestBodyException("Received bad request body for pet: " + exception.getConstraintViolations());
            }
        } else {
            throw new InvalidIdException("Invalid owner id, this owner is not registered yet");
        }
        return new ResponseData<>(petDTO);
    }

    @Override
    public ResponseData<PetDTO> getPetById(int petId) {
        Pet result = pets.findById(petId);
        if (result != null) {
            return new ResponseData<>(modelMapper.map(pets.findById(petId), PetDTO.class));
        } else {
            throw new InvalidIdException("Invalid pet id, this pet does not exist");
        }
    }

    @Override
    public ResponseData<Collection<PetDTO>> getPetsByOwnerId(int ownerId) {
        return new ResponseData<>(convertToPetDTO(pets.findByOwnerId(ownerId)));
    }

    @Override
    public ResponseData<Collection<PetType>> getPetTypes() {
        return new ResponseData<>(pets.findPetTypes());
    }


    private Collection<PetDTO> convertToPetDTO(Collection<Pet> pets) {
        List<PetDTO> convertedResults = new ArrayList<>(pets.size());
        pets.forEach(pet -> convertedResults.add(modelMapper.map(pet, PetDTO.class)));
        return convertedResults;
    }
}
