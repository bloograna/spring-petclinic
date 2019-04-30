package org.springframework.samples.petclinic.api.v1.controllers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.PetClinicApplication;
import org.springframework.samples.petclinic.dtos.ResponseData;
import org.springframework.samples.petclinic.exceptions.InvalidRequestBodyException;
import org.springframework.samples.petclinic.exceptions.ServiceException;
import org.springframework.samples.petclinic.model.Vet;
import org.springframework.samples.petclinic.service.interfaces.VetService;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = PetClinicApplication.class)
public class VetControllerTest {

    private static final String VET_API_URL = "/api/v1/vet";

    private MockMvc mockMvc;
    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
        MediaType.APPLICATION_JSON.getSubtype(),
        Charset.forName("utf8"));
    private VetService vetServiceMock = mock(VetService.class);


    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new VetController(vetServiceMock)).build();
    }

    @Test
    public void getVetSuccess() throws Exception {
        ResponseData<Collection<Vet>> emptyListResponse = new ResponseData<>();
        emptyListResponse.setData(Collections.emptyList());
        when(vetServiceMock.getVets()).thenReturn(emptyListResponse);
        mockMvc.perform(get(VET_API_URL))
            .andExpect(status().isOk())
            .andExpect(content().contentType(contentType));
    }

    @Test
    public void getVetServiceFail() throws Exception {
        when(vetServiceMock.getVets()).thenThrow(ServiceException.class);
        mockMvc.perform(get(VET_API_URL))
            .andExpect(status().is(HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Test
    public void saveVetInvalidBody() throws Exception {
        when(vetServiceMock.saveVet(any())).thenThrow(InvalidRequestBodyException.class);
        mockMvc.perform(post(VET_API_URL))
            .andExpect(status().is(HttpStatus.BAD_REQUEST.value()));
    }
}
