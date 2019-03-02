package org.springframework.samples.petclinic.v1.services;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.samples.petclinic.v1.dtos.VisitDTO;
import org.springframework.samples.petclinic.exceptions.InvalidFormatException;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.repositories.PetRepository;
import org.springframework.samples.petclinic.repositories.VisitRepository;
import org.springframework.samples.petclinic.service.interfaces.VisitService;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Component
public class VisitServiceImpl implements VisitService {
    private final VisitRepository visits;
    private final PetRepository pets;
    private final ModelMapper modelMapper;

    @Autowired
    public VisitServiceImpl(VisitRepository visits, PetRepository pets, ModelMapper modelMapper) {
        this.visits = visits;
        this.pets = pets;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseData<String> saveVisit(VisitDTO visitDto) {
        Pet pet = pets.findById(visitDto.getPetId());
        // if we're actually have this pet in the database, then save the visit
        if (pet != null) {
            Visit visit = modelMapper.map(visitDto, Visit.class);
            visits.save(visit);
        } else {
            throw new InvalidIdException("Invalid pet id, this pet is not registered yet");
        }
        return new ResponseData<>("ok");
    }


    @Override
    public ResponseData<String> deleteVisit(int visitId) {
        try {
            visits.deleteById(visitId);
        } catch (EmptyResultDataAccessException exception) {
            throw new InvalidIdException("Invalid visit id, this visit does not exist");
        }
        return new ResponseData<>("ok");
    }

    @Override
    public ResponseData<Collection<VisitDTO>> getVisitsByPetId(int petId) {
        return new ResponseData<>(convertToVisitDTO(visits.findByPetId(petId)));
    }

    @Override
    public ResponseData<Collection<VisitDTO>> getVisitsByDate(String dateString) {
        //date should be in "yyyy-MM-dd" format
        try {
            LocalDate visitDate = LocalDate.parse(dateString);
            return new ResponseData<>(convertToVisitDTO(visits.findByDate(visitDate)));
        } catch (DateTimeParseException exception) {
            throw new InvalidFormatException("Unable to parse date, please supply date string in yyyy-MM-dd format");
        }
    }

    @Override
    public ResponseData<Collection<VisitDTO>> getVisitsByVetId(int vetId) {
        return new ResponseData<>(convertToVisitDTO(visits.findByVetId(vetId)));
    }

    private Collection<VisitDTO> convertToVisitDTO(Collection<Visit> visits) {
        List<VisitDTO> convertedResults = new ArrayList<>(visits.size());
        visits.forEach(visit -> convertedResults.add(modelMapper.map(visit, VisitDTO.class)));
        return convertedResults;
    }

}
