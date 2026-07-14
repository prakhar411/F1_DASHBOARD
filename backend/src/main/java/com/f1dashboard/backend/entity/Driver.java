package com.f1dashboard.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
public class Driver {

    @Id
    private String driverId;

    private String code;
    private Integer permanentNumber;
    private String givenName;
    private String familyName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String url;

    @Column(name = "is_current")
    private Boolean current;
}
