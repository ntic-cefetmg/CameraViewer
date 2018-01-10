package br.cefetmg.cameraviewer.web.rest;

import br.cefetmg.cameraviewer.domain.UserPermission;
import br.cefetmg.cameraviewer.repository.UserPermissionRepository;
import br.cefetmg.cameraviewer.security.AuthoritiesConstants;
import br.cefetmg.cameraviewer.security.SecurityUtils;
import com.codahale.metrics.annotation.Timed;
import br.cefetmg.cameraviewer.domain.Camera;

import br.cefetmg.cameraviewer.repository.CameraRepository;
import br.cefetmg.cameraviewer.web.rest.errors.BadRequestAlertException;
import br.cefetmg.cameraviewer.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.Iterator;
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
    private final UserPermissionRepository userPermissionRepository;

    public CameraResource(CameraRepository cameraRepository, UserPermissionRepository userPermissionRepository) {
        this.cameraRepository = cameraRepository;
        this.userPermissionRepository = userPermissionRepository;
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
    @Secured(AuthoritiesConstants.ADMIN)
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
    @Secured(AuthoritiesConstants.ADMIN)
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
    public List<Camera> getAllCameras(HttpServletRequest request) {
        log.debug("REST request to get all Cameras");
        // If the user is an admin, return all the cameras
        if(SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) return cameraRepository.findAll();
        List<Camera> cameras = new ArrayList<>();
        // For each camera, check if the user has permission to see it, if he does, add the camera to the final camera list
        cameraRepository.findAll().forEach(camera -> {
            userPermissionRepository.findAllWithEagerRelationships().forEach(userPermission -> {
                if(userPermission.getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin())){
                    userPermission.getCamerasThatHaveAccesses().forEach(accessCamera -> {
                        if(!request.getRemoteAddr().equals("0:0:0:0:0:0:0:1")) camera.setAccessURL("N/A");
                        if(accessCamera.equals(camera)) cameras.add(camera);
                    });
                }
            });
        });
        return cameras;
        }

    /**
     * GET  /cameras/:id : get the "id" camera.
     *
     * @param id the id of the camera to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the camera, or with status 404 (Not Found)
     */
    @GetMapping("/cameras/{id}")
    @Timed
    public ResponseEntity<Camera> getCamera(@PathVariable Long id, HttpServletRequest request) {
        log.debug("REST request to get Camera : {}", id);
        Camera camera = cameraRepository.findOne(id);
        // If the user is an admin, return the camera
        if(SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) return ResponseUtil.wrapOrNotFound(Optional.ofNullable(camera));
        // For each User Permission, check if the logged user has access to the returned camera, return it if he does
        // There is probably a better way of doing this, but since it's a very limited amount of data (Not expected more than 100 cameras), this is acceptable
        // Here stays a note to fix it in the future with a more effective way
        if(!request.getRemoteAddr().equals("0:0:0:0:0:0:0:1")) camera.setAccessURL("N/A");
        for(UserPermission userPermission : userPermissionRepository.findAllWithEagerRelationships()){
            if(userPermission.getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin())){
                for(Camera accessCamera : userPermission.getCamerasThatHaveAccesses()){
                    if(accessCamera.equals(camera)) return ResponseUtil.wrapOrNotFound(Optional.ofNullable(camera));
                }
            }
        }
        // In case the user has no permission, return not found
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(null));
    }

    /**
     * DELETE  /cameras/:id : delete the "id" camera.
     *
     * @param id the id of the camera to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cameras/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteCamera(@PathVariable Long id) {
        log.debug("REST request to delete Camera : {}", id);
        cameraRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
