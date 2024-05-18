package com.lamb.tech.bok.yoon.web.rest;

import com.lamb.tech.bok.yoon.domain.Transporter;
import com.lamb.tech.bok.yoon.repository.TransporterRepository;
import com.lamb.tech.bok.yoon.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.lamb.tech.bok.yoon.domain.Transporter}.
 */
@RestController
@RequestMapping("/api/transporters")
@Transactional
public class TransporterResource {

    private final Logger log = LoggerFactory.getLogger(TransporterResource.class);

    private static final String ENTITY_NAME = "transporter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TransporterRepository transporterRepository;

    public TransporterResource(TransporterRepository transporterRepository) {
        this.transporterRepository = transporterRepository;
    }

    /**
     * {@code POST  /transporters} : Create a new transporter.
     *
     * @param transporter the transporter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transporter, or with status {@code 400 (Bad Request)} if the transporter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Transporter> createTransporter(@RequestBody Transporter transporter) throws URISyntaxException {
        log.debug("REST request to save Transporter : {}", transporter);
        if (transporter.getId() != null) {
            throw new BadRequestAlertException("A new transporter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        transporter = transporterRepository.save(transporter);
        return ResponseEntity.created(new URI("/api/transporters/" + transporter.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, transporter.getId().toString()))
            .body(transporter);
    }

    /**
     * {@code PUT  /transporters/:id} : Updates an existing transporter.
     *
     * @param id the id of the transporter to save.
     * @param transporter the transporter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transporter,
     * or with status {@code 400 (Bad Request)} if the transporter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transporter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Transporter> updateTransporter(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Transporter transporter
    ) throws URISyntaxException {
        log.debug("REST request to update Transporter : {}, {}", id, transporter);
        if (transporter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, transporter.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!transporterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        transporter = transporterRepository.save(transporter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transporter.getId().toString()))
            .body(transporter);
    }

    /**
     * {@code PATCH  /transporters/:id} : Partial updates given fields of an existing transporter, field will ignore if it is null
     *
     * @param id the id of the transporter to save.
     * @param transporter the transporter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transporter,
     * or with status {@code 400 (Bad Request)} if the transporter is not valid,
     * or with status {@code 404 (Not Found)} if the transporter is not found,
     * or with status {@code 500 (Internal Server Error)} if the transporter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Transporter> partialUpdateTransporter(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Transporter transporter
    ) throws URISyntaxException {
        log.debug("REST request to partial update Transporter partially : {}, {}", id, transporter);
        if (transporter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, transporter.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!transporterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Transporter> result = transporterRepository
            .findById(transporter.getId())
            .map(existingTransporter -> {
                if (transporter.getName() != null) {
                    existingTransporter.setName(transporter.getName());
                }
                if (transporter.getAvatar() != null) {
                    existingTransporter.setAvatar(transporter.getAvatar());
                }
                if (transporter.getPhoneNumber() != null) {
                    existingTransporter.setPhoneNumber(transporter.getPhoneNumber());
                }
                if (transporter.getIsActive() != null) {
                    existingTransporter.setIsActive(transporter.getIsActive());
                }

                return existingTransporter;
            })
            .map(transporterRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transporter.getId().toString())
        );
    }

    /**
     * {@code GET  /transporters} : get all the transporters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transporters in body.
     */
    @GetMapping("")
    public List<Transporter> getAllTransporters() {
        log.debug("REST request to get all Transporters");
        return transporterRepository.findAll();
    }

    /**
     * {@code GET  /transporters/:id} : get the "id" transporter.
     *
     * @param id the id of the transporter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transporter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Transporter> getTransporter(@PathVariable("id") Long id) {
        log.debug("REST request to get Transporter : {}", id);
        Optional<Transporter> transporter = transporterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transporter);
    }

    /**
     * {@code DELETE  /transporters/:id} : delete the "id" transporter.
     *
     * @param id the id of the transporter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransporter(@PathVariable("id") Long id) {
        log.debug("REST request to delete Transporter : {}", id);
        transporterRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
