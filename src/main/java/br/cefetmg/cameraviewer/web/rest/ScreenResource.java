package br.cefetmg.cameraviewer.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.cefetmg.cameraviewer.domain.Screen;

import br.cefetmg.cameraviewer.repository.ScreenRepository;
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
 * REST controller for managing Screen.
 */
@RestController
@RequestMapping("/api")
public class ScreenResource {

    private final Logger log = LoggerFactory.getLogger(ScreenResource.class);

    private static final String ENTITY_NAME = "screen";

    private final ScreenRepository screenRepository;

    public ScreenResource(ScreenRepository screenRepository) {
        this.screenRepository = screenRepository;
    }

    /**
     * POST  /screens : Create a new screen.
     *
     * @param screen the screen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new screen, or with status 400 (Bad Request) if the screen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/screens")
    @Timed
    public ResponseEntity<Screen> createScreen(@Valid @RequestBody Screen screen) throws URISyntaxException {
        log.debug("REST request to save Screen : {}", screen);
        if (screen.getId() != null) {
            throw new BadRequestAlertException("A new screen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Screen result = screenRepository.save(screen);
        return ResponseEntity.created(new URI("/api/screens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /screens : Updates an existing screen.
     *
     * @param screen the screen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated screen,
     * or with status 400 (Bad Request) if the screen is not valid,
     * or with status 500 (Internal Server Error) if the screen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/screens")
    @Timed
    public ResponseEntity<Screen> updateScreen(@Valid @RequestBody Screen screen) throws URISyntaxException {
        log.debug("REST request to update Screen : {}", screen);
        if (screen.getId() == null) {
            return createScreen(screen);
        }
        Screen result = screenRepository.save(screen);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, screen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /screens : get all the screens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of screens in body
     */
    @GetMapping("/screens")
    @Timed
    public List<Screen> getAllScreens() {
        log.debug("REST request to get all Screens");
        return screenRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /screens/:id : get the "id" screen.
     *
     * @param id the id of the screen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the screen, or with status 404 (Not Found)
     */
    @GetMapping("/screens/{id}")
    @Timed
    public ResponseEntity<Screen> getScreen(@PathVariable Long id) {
        log.debug("REST request to get Screen : {}", id);
        Screen screen = screenRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(screen));
    }

    /**
     * DELETE  /screens/:id : delete the "id" screen.
     *
     * @param id the id of the screen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/screens/{id}")
    @Timed
    public ResponseEntity<Void> deleteScreen(@PathVariable Long id) {
        log.debug("REST request to delete Screen : {}", id);
        screenRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}