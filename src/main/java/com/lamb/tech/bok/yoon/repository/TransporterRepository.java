package com.lamb.tech.bok.yoon.repository;

import com.lamb.tech.bok.yoon.domain.Transporter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Transporter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransporterRepository extends JpaRepository<Transporter, Long> {}
