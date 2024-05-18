package com.lamb.tech.bok.yoon.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Device.
 */
@Entity
@Table(name = "device")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "platform")
    private String platform;

    @Column(name = "brand")
    private String brand;

    @NotNull
    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "model")
    private String model;

    @Column(name = "os_version")
    private String osVersion;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Device id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlatform() {
        return this.platform;
    }

    public Device platform(String platform) {
        this.setPlatform(platform);
        return this;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getBrand() {
        return this.brand;
    }

    public Device brand(String brand) {
        this.setBrand(brand);
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getToken() {
        return this.token;
    }

    public Device token(String token) {
        this.setToken(token);
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getModel() {
        return this.model;
    }

    public Device model(String model) {
        this.setModel(model);
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getOsVersion() {
        return this.osVersion;
    }

    public Device osVersion(String osVersion) {
        this.setOsVersion(osVersion);
        return this;
    }

    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public Device isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public Device createdAt(String createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }

    public Device updatedAt(String updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Device)) {
            return false;
        }
        return getId() != null && getId().equals(((Device) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Device{" +
            "id=" + getId() +
            ", platform='" + getPlatform() + "'" +
            ", brand='" + getBrand() + "'" +
            ", token='" + getToken() + "'" +
            ", model='" + getModel() + "'" +
            ", osVersion='" + getOsVersion() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
