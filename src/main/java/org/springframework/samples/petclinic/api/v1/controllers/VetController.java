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

package org.springframework.samples.petclinic.api.v1.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.exceptions.ServiceException;
import org.springframework.samples.petclinic.model.Specialty;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.service.interfaces.VetService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Set;


/**
 * @author Juergen Hoeller
 * @author Mark Fisher
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Slf4j
@RestController
@RequestMapping(path = "api/v1/vet", produces = MediaType.APPLICATION_JSON_VALUE)
class VetController {

    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @PostMapping
    public ResponseData<String> saveVet(@RequestBody @Valid Vet vet) {
        return vetService.saveVet(vet);
    }

    @GetMapping
    public ResponseData<Collection<Vet>> getVets() {
        return vetService.getVets();
    }

    @GetMapping("/specialty")
    public ResponseData<Set<Specialty>> getSpecialties() {
        return vetService.getSpecialties();
    }

    @GetMapping("/{vetId}")
    public ResponseData<Vet> getVetById(@PathVariable int vetId) {
        return vetService.getVetById(vetId);
    }

    @PostMapping("/{vetId}/specialty")
    public ResponseData<String> addSpecialty(@PathVariable int vetId, @RequestBody @Valid Collection<Specialty> specialty) {
        return vetService.addSpecialtyToVet(vetId, specialty);
    }

}
