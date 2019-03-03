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
import org.springframework.samples.petclinic.model.Visit;
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
    public ResponseData<Collection<VetDTO>> getVets() {
        return new ResponseData<>(convertToVisitDTO(vets.findAll()));
    }

    @Override
    public ResponseData<VetDTO> getVetById(int vetId) {
        Vet result = vets.findById(vetId);
        if (result != null) {
            return new ResponseData<>(modelMapper.map(vets.findById(vetId), VetDTO.class));
        } else {
            throw new InvalidIdException("Invalid pet id, this pet does not exist");
        }
    }

    @Override
    public ResponseData<String> saveVet(VetDTO vetDto) {
        try {
            Vet vet = modelMapper.map(vetDto, Vet.class);
            // for some bloody reason visits and specialties are not mapped.
            vetDto.getVisits().forEach(visitDTO -> {
                Visit visit = modelMapper.map(visitDTO, Visit.class);
                vet.addVisit(visit);
            });
            vetDto.getSpecialties().forEach(specialty -> vet.addSpecialty(specialty));

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


    private Collection<VetDTO> convertToVisitDTO(Collection<Vet> vets) {
        List<VetDTO> convertedResults = new ArrayList<>(vets.size());
        vets.forEach(vet -> convertedResults.add(modelMapper.map(vet, VetDTO.class)));
        return convertedResults;
    }
}
