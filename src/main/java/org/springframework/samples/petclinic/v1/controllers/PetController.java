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
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.service.interfaces.PetService;
import org.springframework.samples.petclinic.v1.dtos.PetDTO;
import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Slf4j
@RestController
@RequestMapping(path = "/v1/pets", produces = MediaType.APPLICATION_JSON_VALUE)
class PetController {

    private PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping
    public ResponseData<String> updatePet(@RequestBody PetDTO pet) {
        return petService.savePet(pet);
    }

    @DeleteMapping("/{petId}")
    public ResponseData<String> deletePet(@PathVariable int petId) {
        return petService.deletePet(petId);
    }

    @GetMapping("/{petId}")
    public ResponseData<PetDTO> getPetById(@PathVariable int petId) {
        return petService.getPetById(petId);
    }

    // in an ideal world i would have done something like /v1/pets?ownerId=2&type=1
    // to do a more refined db look up by criteria, but then that means I gotta write
    // custom DALs and DAOs which I'm not an expert at so screw it this will do for now
    // even though its very confusing syntactically.
    @GetMapping("/owner/{ownerId}")
    public  ResponseData<Collection<PetDTO>> getPetByOwnerId(@PathVariable int ownerId) {
        return petService.getPetsByOwnerId(ownerId);
    }

    @GetMapping("/types")
    public ResponseData<Collection<PetType>> getPetTypes() {
        return petService.getPetTypes();
    }
}
