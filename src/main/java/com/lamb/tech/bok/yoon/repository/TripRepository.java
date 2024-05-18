package com.lamb.tech.bok.yoon.repository;

import com.lamb.tech.bok.yoon.domain.Trip;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Trip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {}
