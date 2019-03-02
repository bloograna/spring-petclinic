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
import org.springframework.lang.NonNull;
import org.springframework.samples.petclinic.dtos.OwnerDTO;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.service.interfaces.OwnerService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(path = "/v1/owners", produces = MediaType.APPLICATION_JSON_VALUE)
class OwnerController {

    private final OwnerService ownerService;


    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping
    public ResponseData<String> saveOwner(@RequestBody @NonNull OwnerDTO ownerDTO) {
        return ownerService.saveOwner(ownerDTO);
    }

    @GetMapping
    public ResponseData<Collection<OwnerDTO>> getOwners(String lastName) {
        return ownerService.findOwnerByLastName(lastName);
    }

}
