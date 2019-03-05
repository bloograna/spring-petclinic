package org.springframework.samples.petclinic.v1.services;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.dtos.VetDTO;
import org.springframework.samples.petclinic.dtos.VisitDTO;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.model.Specialty;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.repositories.VetRepository;
import org.springframework.samples.petclinic.service.interfaces.VetService;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class VetServiceImpl implements VetService {
    private final VetRepository vets;
    private final ModelMapper modelMapper;

    @Autowired
    public VetServiceImpl(VetRepository vets, ModelMapper modelMapper) {
        this.vets = vets;
        this.modelMapper = modelMapper;
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
    public ResponseData<String> saveVet(Vet vet) {
        try {
            // BECAUSE FUCK FK AND INDEXING ON THE TABLE!!
            // if want to add new visit or vet, id must be null
            // "id" : null
            // if want to add specialty must include id otherwise shit.
//            Vet vet = modelMapper.map(vetDto, Vet.class);
//            vetDto.getSpecialties().forEach(specialty -> vet.addSpecialty(specialty));
            vets.save(vet);
            return new ResponseData<>("ok");
        } catch (ConstraintViolationException exception) {
            throw new InvalidRequestBodyException("Received bad request body for vet: " + exception.getConstraintViolations());
        }
    }

    @Override
    public ResponseData<Set<Specialty>> getSpecialties() {
        return new ResponseData<>(vets.findSpecialties());
    }

    @Override
    public ResponseData<String> addSpecialtyToVet(int vetId, Collection<Specialty> specialties) {
        Vet vet = this.vets.findById(vetId);
        if (vet != null) {
            specialties.forEach(specialty -> vet.addSpecialty(specialty));
            vets.save(vet);
            return new ResponseData<>("ok");
        } else {
            throw new InvalidIdException("Invalid vet id, this vet does not exist");
        }
    }

//
//    private Collection<VetDTO> convertToVisitDTO(Collection<Vet> vets) {
//        List<VetDTO> convertedResults = new ArrayList<>(vets.size());
//        vets.forEach(vet -> convertedResults.add(modelMapper.map(vet, VetDTO.class)));
//        return convertedResults;
//    }
}
