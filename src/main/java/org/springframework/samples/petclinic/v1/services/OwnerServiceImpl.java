package org.springframework.samples.petclinic.v1.services;

import org.modelmapper.ModelMapper;
import org.springframework.samples.petclinic.dtos.OwnerDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.repositories.OwnerRepository;
import org.springframework.samples.petclinic.service.interfaces.OwnerService;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository owners;
    private final ModelMapper modelMapper;

    public OwnerServiceImpl(OwnerRepository owners, ModelMapper modelMapper) {
        this.owners = owners;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseData<Collection<OwnerDTO>> findOwnerByLastName(String lastName) {
        return new ResponseData<>(convertToOwnerDTO(owners.findByLastName(lastName == null ? "" : lastName)));
    }

    @Override
    public ResponseData<String> saveOwner(OwnerDTO ownerDTO) {
        try {
            Owner owner = modelMapper.map(ownerDTO, Owner.class);
            owners.save(owner);
        } catch (ConstraintViolationException exception) {
            throw new InvalidRequestBodyException("Received bad request body for owner: " + exception.getConstraintViolations());
        }
        return new ResponseData<>("ok");
    }

    private Collection<OwnerDTO> convertToOwnerDTO(Collection<Owner> owners) {
        List<OwnerDTO> convertedResults = new ArrayList<>(owners.size());
        owners.forEach(owner -> convertedResults.add(modelMapper.map(owner, OwnerDTO.class)));
        return convertedResults;
    }
}
