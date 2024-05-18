package com.lamb.tech.bok.yoon.web.rest;

import com.lamb.tech.bok.yoon.domain.Seat;
import com.lamb.tech.bok.yoon.repository.SeatRepository;
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
 * REST controller for managing {@link com.lamb.tech.bok.yoon.domain.Seat}.
 */
@RestController
@RequestMapping("/api/seats")
@Transactional
public class SeatResource {

    private final Logger log = LoggerFactory.getLogger(SeatResource.class);

    private static final String ENTITY_NAME = "seat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeatRepository seatRepository;

    public SeatResource(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    /**
     * {@code POST  /seats} : Create a new seat.
     *
     * @param seat the seat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seat, or with status {@code 400 (Bad Request)} if the seat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Seat> createSeat(@RequestBody Seat seat) throws URISyntaxException {
        log.debug("REST request to save Seat : {}", seat);
        if (seat.getId() != null) {
            throw new BadRequestAlertException("A new seat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        seat = seatRepository.save(seat);
        return ResponseEntity.created(new URI("/api/seats/" + seat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, seat.getId().toString()))
            .body(seat);
    }

    /**
     * {@code PUT  /seats/:id} : Updates an existing seat.
     *
     * @param id the id of the seat to save.
     * @param seat the seat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seat,
     * or with status {@code 400 (Bad Request)} if the seat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Seat> updateSeat(@PathVariable(value = "id", required = false) final Long id, @RequestBody Seat seat)
        throws URISyntaxException {
        log.debug("REST request to update Seat : {}, {}", id, seat);
        if (seat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!seatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        seat = seatRepository.save(seat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seat.getId().toString()))
            .body(seat);
    }

    /**
     * {@code PATCH  /seats/:id} : Partial updates given fields of an existing seat, field will ignore if it is null
     *
     * @param id the id of the seat to save.
     * @param seat the seat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seat,
     * or with status {@code 400 (Bad Request)} if the seat is not valid,
     * or with status {@code 404 (Not Found)} if the seat is not found,
     * or with status {@code 500 (Internal Server Error)} if the seat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Seat> partialUpdateSeat(@PathVariable(value = "id", required = false) final Long id, @RequestBody Seat seat)
        throws URISyntaxException {
        log.debug("REST request to partial update Seat partially : {}, {}", id, seat);
        if (seat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, seat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!seatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Seat> result = seatRepository
            .findById(seat.getId())
            .map(existingSeat -> {
                if (seat.getSeatNumber() != null) {
                    existingSeat.setSeatNumber(seat.getSeatNumber());
                }
                if (seat.getIsAvailable() != null) {
                    existingSeat.setIsAvailable(seat.getIsAvailable());
                }

                return existingSeat;
            })
            .map(seatRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, seat.getId().toString())
        );
    }

    /**
     * {@code GET  /seats} : get all the seats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seats in body.
     */
    @GetMapping("")
    public List<Seat> getAllSeats() {
        log.debug("REST request to get all Seats");
        return seatRepository.findAll();
    }

    /**
     * {@code GET  /seats/:id} : get the "id" seat.
     *
     * @param id the id of the seat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeat(@PathVariable("id") Long id) {
        log.debug("REST request to get Seat : {}", id);
        Optional<Seat> seat = seatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seat);
    }

    /**
     * {@code DELETE  /seats/:id} : delete the "id" seat.
     *
     * @param id the id of the seat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable("id") Long id) {
        log.debug("REST request to delete Seat : {}", id);
        seatRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
