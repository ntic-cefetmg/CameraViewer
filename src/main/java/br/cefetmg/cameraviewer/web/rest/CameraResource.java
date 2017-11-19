package br.cefetmg.cameraviewer.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.cefetmg.cameraviewer.domain.Camera;

import br.cefetmg.cameraviewer.repository.CameraRepository;
import br.cefetmg.cameraviewer.web.rest.errors.BadRequestAlertException;
import br.cefetmg.cameraviewer.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Camera.
 */
@RestController
@RequestMapping("/api")
public class CameraResource {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);

    private static final String ENTITY_NAME = "camera";

    private final CameraRepository cameraRepository;

    public CameraResource(CameraRepository cameraRepository) {
        this.cameraRepository = cameraRepository;
    }

    /**
     * POST  /cameras : Create a new camera.
     *
     * @param camera the camera to create
     * @return the ResponseEntity with status 201 (Created) and with body the new camera, or with status 400 (Bad Request) if the camera has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cameras")
    @Timed
    public ResponseEntity<Camera> createCamera(@Valid @RequestBody Camera camera) throws URISyntaxException {
        log.debug("REST request to save Camera : {}", camera);
        if (camera.getId() != null) {
            throw new BadRequestAlertException("A new camera cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Camera result = cameraRepository.save(camera);
        return ResponseEntity.created(new URI("/api/cameras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cameras : Updates an existing camera.
     *
     * @param camera the camera to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated camera,
     * or with status 400 (Bad Request) if the camera is not valid,
     * or with status 500 (Internal Server Error) if the camera couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cameras")
    @Timed
    public ResponseEntity<Camera> updateCamera(@Valid @RequestBody Camera camera) throws URISyntaxException {
        log.debug("REST request to update Camera : {}", camera);
        if (camera.getId() == null) {
            return createCamera(camera);
        }
        Camera result = cameraRepository.save(camera);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, camera.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cameras : get all the cameras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cameras in body
     */
    @GetMapping("/cameras")
    @Timed
    public List<Camera> getAllCameras() {
        log.debug("REST request to get all Cameras");
        return cameraRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /cameras/:id : get the "id" camera.
     *
     * @param id the id of the camera to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the camera, or with status 404 (Not Found)
     */
    @GetMapping("/cameras/{id}")
    @Timed
    public ResponseEntity<Camera> getCamera(@PathVariable Long id) {
        log.debug("REST request to get Camera : {}", id);
        Camera camera = cameraRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(camera));
    }

    /**
     * DELETE  /cameras/:id : delete the "id" camera.
     *
     * @param id the id of the camera to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cameras/{id}")
    @Timed
    public ResponseEntity<Void> deleteCamera(@PathVariable Long id) {
        log.debug("REST request to delete Camera : {}", id);
        cameraRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
