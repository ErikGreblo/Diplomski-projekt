package com.projekt.diplomski_projekt.model;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.projekt.diplomski_projekt.repository.StudyMaterialRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FileService{

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private StudyMaterialRepository repository;

    public void saveFileLog(String filename){
        repository.save(new StudyMaterial(filename));
    }

    public List<StudyMaterial> getAllFiles(){
        return repository.findAll();
    }

    public void deleteFile(Long id){
        StudyMaterial fileRecord = repository.findById(id).orElse(null);
        if (fileRecord != null){
            try{
                Path filePath = Path.of(uploadDir).resolve(fileRecord.getFilename());
                Files.deleteIfExists(filePath);
            }catch (IOException e){
                System.out.println("Greška kod brisanja datoteke s diska: " + e.getMessage());
            }
            repository.delete(fileRecord);
        }
    };

    public String readAllUploads() {
        Path uploadPath = Path.of(uploadDir);

        if (!Files.exists(uploadPath)) {
            System.out.println("Uploads folder does not exist: " + uploadDir);
            return "";
        }

        StringBuilder allText = new StringBuilder();

        try {
            Files.list(uploadPath).forEach(file -> {
                System.out.println("Processing file: " + file.getFileName());

                if (Files.isRegularFile(file) && file.toString().toLowerCase().endsWith(".pdf")) {
                    try (PDDocument document = PDDocument.load(file.toFile())) {
                        PDFTextStripper stripper = new PDFTextStripper();
                        String text = stripper.getText(document);
                        System.out.println("Extracted text length: " + text.length());
                        allText.append(text).append("\n\n");
                    } catch (IOException e) {
                        System.out.println("Failed to read PDF: " + file.getFileName());
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("Skipping non-PDF file: " + file.getFileName());
                }
            });
        } catch (IOException e) {
            System.out.println("Failed to list files in folder: " + uploadDir);
            e.printStackTrace();
        }

        System.out.println("Total collected text length: " + allText.length());
        return allText.toString();
    }

}

