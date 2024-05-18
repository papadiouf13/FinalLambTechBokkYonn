package com.lamb.tech.bok.yoon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lamb.tech.bok.yoon.domain.enumeration.ReservationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "departure_timme")
    private String departureTimme;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReservationStatus status;

    @Column(name = "reservation_number", unique = true)
    private String reservationNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "departureLocation", "arrivalLocation", "car", "transporter" }, allowSetters = true)
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "car" }, allowSetters = true)
    private Seat seat;

    @JsonIgnoreProperties(value = { "reservation" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "reservation")
    private Payment payment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Reservation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartureTimme() {
        return this.departureTimme;
    }

    public Reservation departureTimme(String departureTimme) {
        this.setDepartureTimme(departureTimme);
        return this;
    }

    public void setDepartureTimme(String departureTimme) {
        this.departureTimme = departureTimme;
    }

    public ReservationStatus getStatus() {
        return this.status;
    }

    public Reservation status(ReservationStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public String getReservationNumber() {
        return this.reservationNumber;
    }

    public Reservation reservationNumber(String reservationNumber) {
        this.setReservationNumber(reservationNumber);
        return this;
    }

    public void setReservationNumber(String reservationNumber) {
        this.reservationNumber = reservationNumber;
    }

    public Trip getTrip() {
        return this.trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public Reservation trip(Trip trip) {
        this.setTrip(trip);
        return this;
    }

    public Seat getSeat() {
        return this.seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Reservation seat(Seat seat) {
        this.setSeat(seat);
        return this;
    }

    public Payment getPayment() {
        return this.payment;
    }

    public void setPayment(Payment payment) {
        if (this.payment != null) {
            this.payment.setReservation(null);
        }
        if (payment != null) {
            payment.setReservation(this);
        }
        this.payment = payment;
    }

    public Reservation payment(Payment payment) {
        this.setPayment(payment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return getId() != null && getId().equals(((Reservation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", departureTimme='" + getDepartureTimme() + "'" +
            ", status='" + getStatus() + "'" +
            ", reservationNumber='" + getReservationNumber() + "'" +
            "}";
    }
}
