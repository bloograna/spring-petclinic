package org.springframework.samples.petclinic.api.v1.services;

import org.junit.Before;
import org.junit.Test;
import org.springframework.samples.petclinic.exceptions.InvalidIdException;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.repositories.VetRepository;

import javax.validation.ConstraintViolationException;
import java.util.Collections;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class VetServiceImplTest {

    private VetRepository vetRepo = mock(VetRepository.class);

    private VetServiceImpl vetService;

    @Before
    public void setup() {
        vetService = new VetServiceImpl(vetRepo);
    }

    @Test
    public void getVets() {
        when(vetRepo.findAll()).thenReturn(Collections.emptyList());
        assertTrue(vetService.getVets().getData().isEmpty());
    }

    @Test
    public void getVetById() {
        Vet expected = new Vet();
        when(vetRepo.findById(any())).thenReturn(expected);
        assertEquals(expected, vetService.getVetById(1).getData());
    }

    @Test
    public void saveVet() {
        Vet expected = new Vet();
        doNothing().when(vetRepo).save(any());
        assertEquals(expected, vetService.saveVet(expected).getData());
    }

    @Test(expected = InvalidRequestBodyException.class)
    public void saveVetException() {
        Vet expected = new Vet();
        doThrow(new ConstraintViolationException("foo", Collections.EMPTY_SET)).when(vetRepo).save(any());
        vetService.saveVet(expected);
        fail();
    }

    @Test(expected = NullPointerException.class)
    public void saveVetOtherException() {
        Vet expected = new Vet();
        doThrow(new NullPointerException()).when(vetRepo).save(any());
        vetService.saveVet(expected);
        fail();
    }

    @Test
    public void addSpecialtyToVet() {
        Vet mockVet = mock(Vet.class);
        when(vetRepo.findById(any())).thenReturn(mockVet);
        doNothing().when(mockVet).addSpecialty(any());
        doNothing().when(vetRepo).save(any());
        assertEquals(mockVet, vetService.addSpecialtyToVet(1, Collections.EMPTY_LIST).getData());
    }

    @Test(expected = InvalidIdException.class)
    public void addSpecialtyToVetException() {
        when(vetRepo.findById(any())).thenReturn(null);
        vetService.addSpecialtyToVet(1, Collections.EMPTY_LIST);
        fail();
    }
}
