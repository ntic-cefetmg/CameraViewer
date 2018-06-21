package br.cefetmg.cameraviewer.web.rest;

import br.cefetmg.cameraviewer.CameraViewerApp;

import br.cefetmg.cameraviewer.domain.UserPermission;
import br.cefetmg.cameraviewer.repository.UserPermissionRepository;
import br.cefetmg.cameraviewer.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static br.cefetmg.cameraviewer.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserPermissionResource REST controller.
 *
 * @see UserPermissionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CameraViewerApp.class)
public class UserPermissionResourceIntTest {

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserPermissionMockMvc;

    private UserPermission userPermission;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserPermissionResource userPermissionResource = new UserPermissionResource(userPermissionRepository);
        this.restUserPermissionMockMvc = MockMvcBuilders.standaloneSetup(userPermissionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserPermission createEntity(EntityManager em) {
        UserPermission userPermission = new UserPermission();
        return userPermission;
    }

    @Before
    public void initTest() {
        userPermission = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserPermission() throws Exception {
        int databaseSizeBeforeCreate = userPermissionRepository.findAll().size();

        // Create the UserPermission
        restUserPermissionMockMvc.perform(post("/api/user-permissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPermission)))
            .andExpect(status().isCreated());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeCreate + 1);
        UserPermission testUserPermission = userPermissionList.get(userPermissionList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserPermissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userPermissionRepository.findAll().size();

        // Create the UserPermission with an existing ID
        userPermission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserPermissionMockMvc.perform(post("/api/user-permissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPermission)))
            .andExpect(status().isBadRequest());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserPermissions() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        // Get all the userPermissionList
        restUserPermissionMockMvc.perform(get("/api/user-permissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userPermission.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        // Get the userPermission
        restUserPermissionMockMvc.perform(get("/api/user-permissions/{id}", userPermission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userPermission.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserPermission() throws Exception {
        // Get the userPermission
        restUserPermissionMockMvc.perform(get("/api/user-permissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);
        int databaseSizeBeforeUpdate = userPermissionRepository.findAll().size();

        // Update the userPermission
        UserPermission updatedUserPermission = userPermissionRepository.findOne(userPermission.getId());

        restUserPermissionMockMvc.perform(put("/api/user-permissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserPermission)))
            .andExpect(status().isOk());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeUpdate);
        UserPermission testUserPermission = userPermissionList.get(userPermissionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserPermission() throws Exception {
        int databaseSizeBeforeUpdate = userPermissionRepository.findAll().size();

        // Create the UserPermission

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserPermissionMockMvc.perform(put("/api/user-permissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPermission)))
            .andExpect(status().isCreated());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);
        int databaseSizeBeforeDelete = userPermissionRepository.findAll().size();

        // Get the userPermission
        restUserPermissionMockMvc.perform(delete("/api/user-permissions/{id}", userPermission.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPermission.class);
        UserPermission userPermission1 = new UserPermission();
        userPermission1.setId(1L);
        UserPermission userPermission2 = new UserPermission();
        userPermission2.setId(userPermission1.getId());
        assertThat(userPermission1).isEqualTo(userPermission2);
        userPermission2.setId(2L);
        assertThat(userPermission1).isNotEqualTo(userPermission2);
        userPermission1.setId(null);
        assertThat(userPermission1).isNotEqualTo(userPermission2);
    }
}
