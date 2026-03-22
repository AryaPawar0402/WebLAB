package com.example.webapp.service;

import com.example.webapp.model.Test;
import com.example.webapp.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepo;

    public Test createTest(Test test) {
        return testRepo.save(test);
    }

    public List<Test> getAllTests() {
        return testRepo.findAll();
    }

    public Test getTest(Long id) {
        return testRepo.findById(id).orElse(null);
    }
}