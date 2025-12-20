package com.projekt.diplomski_projekt.service;

import com.projekt.diplomski_projekt.model.Student;

import java.util.List;

public interface StudentService {

    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
