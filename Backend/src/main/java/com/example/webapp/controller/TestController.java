package com.example.webapp.controller;

import com.example.webapp.model.Test;
import com.example.webapp.model.Question;
import com.example.webapp.repository.TestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private TestRepository testRepository;

    @GetMapping
    public List<Test> getAllTests() {
        List<Test> tests = testRepository.findAll();
        logger.info("Fetched {} tests", tests.size());
        return tests;
    }

    @GetMapping("/{id}")
    public Test getTestById(@PathVariable Long id) {
        return testRepository.findById(id).orElseThrow(() -> new RuntimeException("Test not found"));
    }

    @PostMapping("/create")
    public Test createTest(@RequestBody Test test) {
        logger.info("Received test: {}", test.getTitle());
        if (test.getQuestions() != null) {
            logger.info("Questions count: {}", test.getQuestions().size());
            for (Question q : test.getQuestions()) {
                q.setTest(test);
            }
        }
        Test saved = testRepository.save(test);
        logger.info("Saved test with id: {}", saved.getId());
        return saved;
    }
}