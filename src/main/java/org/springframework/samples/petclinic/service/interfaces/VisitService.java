package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.v1.dtos.ResponseData;
import org.springframework.samples.petclinic.v1.dtos.VisitDTO;

import java.util.Collection;

public interface VisitService {
    ResponseData<String> saveVisit(VisitDTO visit);

    ResponseData<String> deleteVisit(int visitId);

    ResponseData<Collection<VisitDTO>> getVisitsByPetId(int petId);

    ResponseData<Collection<VisitDTO>> getVisitsByDate(String dateString);

    ResponseData<Collection<VisitDTO>> getVisitsByVetId(int vetId);
}
