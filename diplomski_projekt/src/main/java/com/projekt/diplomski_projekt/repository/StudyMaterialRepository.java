package com.projekt.diplomski_projekt.repository;

import com.projekt.diplomski_projekt.model.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    StudyMaterial findByFilename(String filename);
}