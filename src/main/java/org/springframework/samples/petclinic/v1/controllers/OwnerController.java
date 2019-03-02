/*
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.samples.petclinic.v1.controllers;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.v1.dtos.OwnerDTO;
import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.samples.petclinic.exceptions.ServiceException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.repositories.OwnerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(path = "/v1/owners", produces = MediaType.APPLICATION_JSON_VALUE)
class OwnerController {

    private final OwnerRepository owners;
    private ModelMapper modelMapper;


    public OwnerController(OwnerRepository clinicService, ModelMapper modelMapper) {
        this.owners = clinicService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/update")
    public ResponseData<String> processCreationForm(@RequestBody OwnerDTO newOwner) {
        Owner owner = modelMapper.map(newOwner, Owner.class);
        try {
            this.owners.save(owner);
        } catch (Exception exception) {
            log.error("Error saving owner to database", exception.getMessage());
            throw new ServiceException("Error saving user to database");
        }
        return new ResponseData<>("ok");
    }

    @GetMapping
    public  ResponseData<Collection<OwnerDTO>> getOwners(String lastName) {
        String searchLastName = lastName == null ? "" : lastName;
        Collection<Owner> results = this.owners.findByLastName(searchLastName);
        ArrayList<OwnerDTO> convertedResults = new ArrayList<>();
        results.forEach(owner -> convertedResults.add(modelMapper.map(owner, OwnerDTO.class)));
        return new ResponseData<>(convertedResults);
    }

}
