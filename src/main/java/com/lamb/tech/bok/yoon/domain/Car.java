package com.lamb.tech.bok.yoon.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "number_of_seats")
    private Integer numberOfSeats;

    @Column(name = "number_of_available_seats")
    private Integer numberOfAvailableSeats;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "plate_number", unique = true)
    private String plateNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transporter transporter;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Car id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Car name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Car description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getNumberOfSeats() {
        return this.numberOfSeats;
    }

    public Car numberOfSeats(Integer numberOfSeats) {
        this.setNumberOfSeats(numberOfSeats);
        return this;
    }

    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public Integer getNumberOfAvailableSeats() {
        return this.numberOfAvailableSeats;
    }

    public Car numberOfAvailableSeats(Integer numberOfAvailableSeats) {
        this.setNumberOfAvailableSeats(numberOfAvailableSeats);
        return this;
    }

    public void setNumberOfAvailableSeats(Integer numberOfAvailableSeats) {
        this.numberOfAvailableSeats = numberOfAvailableSeats;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public Car isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getPlateNumber() {
        return this.plateNumber;
    }

    public Car plateNumber(String plateNumber) {
        this.setPlateNumber(plateNumber);
        return this;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public Transporter getTransporter() {
        return this.transporter;
    }

    public void setTransporter(Transporter transporter) {
        this.transporter = transporter;
    }

    public Car transporter(Transporter transporter) {
        this.setTransporter(transporter);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car)) {
            return false;
        }
        return getId() != null && getId().equals(((Car) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", numberOfSeats=" + getNumberOfSeats() +
            ", numberOfAvailableSeats=" + getNumberOfAvailableSeats() +
            ", isActive='" + getIsActive() + "'" +
            ", plateNumber='" + getPlateNumber() + "'" +
            "}";
    }
}
