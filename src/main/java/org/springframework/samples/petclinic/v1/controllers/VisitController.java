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
import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.samples.petclinic.v1.dtos.VisitDTO;
import org.springframework.samples.petclinic.service.interfaces.VisitService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 * @author Michael Isvy
 * @author Dave Syer
 */
@RestController
@RequestMapping(path = "/v1/visits", produces = MediaType.APPLICATION_JSON_VALUE)
class VisitController {

    private final VisitService visitService;


    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @PostMapping
    public ResponseData<String> updateVisit(@RequestBody VisitDTO visit) {
        return visitService.saveVisit(visit);
    }

    @DeleteMapping("/{visitId}")
    public ResponseData<String> deleteVisit(@PathVariable int visitId) {
        return visitService.deleteVisit(visitId);
    }

    // again.. in an ideal world I would do /v1/visits?petId=1&vetId=2&dateString=2019-03-04
    // to handle the 3 different gets, and visitService would have DAO that construct the
    // sql statement from a db with something like
    // SQLStatement = SELECT * FROM VISITS WHERE PET_ID = ? AND VET_ID = ? AND SOMETHING ELSE ORDER BY DATE;
    //    if (petId != null) {
    //        SQLStatement . set (? ) at index to be pet Id
    //    }
    //
    //    if (vetId != null) {
    //        SQLStatement . set (? ) at index to be vet Id
    //    }
    //
    //    results = SQLStatement.executeQuery();
    // and returns the result set.

    @GetMapping("/pet-id/{petId}")
    public ResponseData<Collection<VisitDTO>> getVisitsByPetId(@PathVariable int petId) {
        return visitService.getVisitsByPetId(petId);
    }

    @GetMapping("/visit-date/{dateString}")
    public ResponseData<Collection<VisitDTO>> getVisitsByDate(@PathVariable String dateString) {
        return visitService.getVisitsByDate(dateString);
    }

    @GetMapping("/vet-id/{vetId}")
    public ResponseData<Collection<VisitDTO>> getVisitsVetId(@PathVariable int vetId) {
        return visitService.getVisitsByVetId(vetId);
    }

}
