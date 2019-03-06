package org.springframework.samples.petclinic.service.interfaces;

import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.dtos.VisitDTO;

import java.util.Collection;

public interface VisitService {
    ResponseData<String> saveVisit(VisitDTO visitDTO);

    ResponseData<String> deleteVisit(int visitId);

    ResponseData<Collection<VisitDTO>> getVisitsByPetId(int petId);

    ResponseData<Collection<VisitDTO>> getVisitsByDate(String dateString);

    ResponseData<Collection<VisitDTO>> getVisitsByDateRange(String startDate, String endDate);

    ResponseData<Collection<VisitDTO>> getVisitsByVetId(int vetId);
}
