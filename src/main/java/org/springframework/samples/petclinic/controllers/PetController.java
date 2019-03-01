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

package org.springframework.samples.petclinic.controllers;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.dtos.PetDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.exceptions.ServiceException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.model.PetValidator;
import org.springframework.samples.petclinic.repositories.OwnerRepository;
import org.springframework.samples.petclinic.repositories.PetRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Slf4j
@RestController
@RequestMapping(path = "/pets", produces = MediaType.APPLICATION_JSON_VALUE)
class PetController {

    private final PetRepository pets;
    private final OwnerRepository owners;
    private ModelMapper modelMapper;

    public PetController(PetRepository pets, OwnerRepository owners, ModelMapper modelMapper) {
        this.pets = pets;
        this.owners = owners;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/update")
    public ResponseData<String> updatePet(@RequestBody PetDTO newPet) {
        Pet pet = modelMapper.map(newPet, Pet.class);
        try {
            Owner owner = owners.findById(newPet.getOwnerId());
            owner.addPet(pet);
            this.pets.save(pet);
            this.owners.save(owner);
        } catch (Exception exception) {
            log.error("Error saving pet to database", exception.getMessage());
            throw new ServiceException("Error saving pet to database");
        }

        return new ResponseData<>("ok");
    }

    @GetMapping("/types")
    public ResponseData<Collection<PetType>> getPetTypes() {
        return new ResponseData<>(pets.findPetTypes());
    }
}
