package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.ConstructorDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.repository.ConstructorRepository;
import com.f1dashboard.backend.service.ConstructorService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ConstructorServiceImpl implements ConstructorService {

    private final ConstructorRepository constructorRepository;

    public ConstructorServiceImpl(ConstructorRepository constructorRepository) {
        this.constructorRepository = constructorRepository;
    }

    @Override
    public List<ConstructorDto> getConstructors() {
        return constructorRepository.findAll().stream()
                .sorted(Comparator.comparing(Constructor::getName))
                .map(this::toDto)
                .toList();
    }

    private ConstructorDto toDto(Constructor constructor) {
        return new ConstructorDto(
                constructor.getConstructorId(),
                constructor.getName(),
                constructor.getNationality()
        );
    }
}
