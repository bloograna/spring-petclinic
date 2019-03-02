package org.springframework.samples.petclinic.v1.services;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.repositories.OwnerRepository;
import org.springframework.samples.petclinic.repositories.PetRepository;
import org.springframework.samples.petclinic.service.interfaces.PetService;
import org.springframework.samples.petclinic.v1.dtos.PetDTO;
import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Component
public class PetServiceImpl implements PetService {
    private PetRepository pets;
    private OwnerRepository owners;
    private ModelMapper modelMapper;

    @Autowired
    public PetServiceImpl(PetRepository pets, OwnerRepository owners, ModelMapper modelMapper) {
        this.pets = pets;
        this.owners = owners;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseData<String> savePet(PetDTO petDto) {
        Owner owner = owners.findById(petDto.getOwnerId());
        if (owner != null) {
            Pet pet = modelMapper.map(petDto, Pet.class);
            pets.save(pet);
        } else {
            throw new InvalidIdException("Invalid owner id, this owner is not registered yet");
        }
        return new ResponseData<>("ok");
    }

    @Override
    public ResponseData<String> deletePet(int petId) {
        try {
            pets.deleteById(petId);
        } catch (EmptyResultDataAccessException exception) {
            throw new InvalidIdException("Invalid pet id, this pet does not exist");
        }
        return new ResponseData<>("ok");
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


    private Collection<PetDTO> convertToPetDTO(Collection<Pet> Pets) {
        List<PetDTO> convertedResults = new ArrayList<>(Pets.size());
        Pets.forEach(Pet -> convertedResults.add(modelMapper.map(Pet, PetDTO.class)));
        return convertedResults;
    }
}
