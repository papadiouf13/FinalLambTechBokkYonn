package com.lamb.tech.bok.yoon.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lamb.tech.bok.yoon.domain.enumeration.TripStatus;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A Trip.
 */
@Entity
@Table(name = "trip")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Trip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TripStatus status;

    @Column(name = "departure_date")
    private String departureDate;

    @Column(name = "arrival_date")
    private String arrivalDate;

    @Column(name = "price")
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location departureLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location arrivalLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "transporter" }, allowSetters = true)
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transporter transporter;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Trip id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Trip name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Trip description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TripStatus getStatus() {
        return this.status;
    }

    public Trip status(TripStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(TripStatus status) {
        this.status = status;
    }

    public String getDepartureDate() {
        return this.departureDate;
    }

    public Trip departureDate(String departureDate) {
        this.setDepartureDate(departureDate);
        return this;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getArrivalDate() {
        return this.arrivalDate;
    }

    public Trip arrivalDate(String arrivalDate) {
        this.setArrivalDate(arrivalDate);
        return this;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Integer getPrice() {
        return this.price;
    }

    public Trip price(Integer price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Location getDepartureLocation() {
        return this.departureLocation;
    }

    public void setDepartureLocation(Location location) {
        this.departureLocation = location;
    }

    public Trip departureLocation(Location location) {
        this.setDepartureLocation(location);
        return this;
    }

    public Location getArrivalLocation() {
        return this.arrivalLocation;
    }

    public void setArrivalLocation(Location location) {
        this.arrivalLocation = location;
    }

    public Trip arrivalLocation(Location location) {
        this.setArrivalLocation(location);
        return this;
    }

    public Car getCar() {
        return this.car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Trip car(Car car) {
        this.setCar(car);
        return this;
    }

    public Transporter getTransporter() {
        return this.transporter;
    }

    public void setTransporter(Transporter transporter) {
        this.transporter = transporter;
    }

    public Trip transporter(Transporter transporter) {
        this.setTransporter(transporter);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trip)) {
            return false;
        }
        return getId() != null && getId().equals(((Trip) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trip{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", departureDate='" + getDepartureDate() + "'" +
            ", arrivalDate='" + getArrivalDate() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
