package com.f1dashboard.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "constructors")
@Getter
@Setter
@NoArgsConstructor
public class Constructor {

    @Id
    private String constructorId;

    private String name;
    private String nationality;
    private String url;
}
