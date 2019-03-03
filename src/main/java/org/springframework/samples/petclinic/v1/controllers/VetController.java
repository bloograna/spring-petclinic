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

import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.samples.petclinic.dtos.VetDTO;
import org.springframework.samples.petclinic.model.Specialty;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.service.interfaces.VetService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;


/**
 * @author Juergen Hoeller
 * @author Mark Fisher
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@RestController
@RequestMapping(path = "/v1/vet", produces = MediaType.APPLICATION_JSON_VALUE)
class VetController {

    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @GetMapping
    public ResponseData<Collection<VetDTO>> getVets() {
        return vetService.getVets();
    }

    @GetMapping("/{vetId}")
    public ResponseData<VetDTO> getVetById(@PathVariable int vetId) {
        return vetService.getVetById(vetId);
    }

    @GetMapping("/speciality")
    public ResponseData<Set<Specialty>> getSpecialties() {
        return vetService.getSpecialties();
    }

    @PostMapping
    public ResponseData<String> saveVet(@RequestBody @NonNull VetDTO vetDTO) {
        return vetService.saveVet(vetDTO);
    }

}
