package com.projekt.diplomski_projekt.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class StudyMaterial {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String filename;
  private LocalDateTime uploadDate;
  public StudyMaterial(){}
  public StudyMaterial(String filename){
    this.filename = filename;
    this.uploadDate = LocalDateTime.now();
  }
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getFilename() { return filename; }
  public void setFilename(String filename) { this.filename = filename; }
  public LocalDateTime getUploadDate() { return uploadDate; }
  public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
}
