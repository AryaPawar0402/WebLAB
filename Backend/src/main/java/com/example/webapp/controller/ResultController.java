package com.example.webapp.controller;

import com.example.webapp.model.Result;
import com.example.webapp.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @GetMapping("/count")
    public long getTotalResultsCount() {
        return resultService.countAllResults();
    }

    @GetMapping("/student/{userId}/count")
    public long getStudentCompletedTestsCount(@PathVariable Long userId) {
        return resultService.countByUserId(userId);
    }

    @GetMapping("/student/{userId}/average")
    public double getStudentAverageScore(@PathVariable Long userId) {
        return resultService.getAverageScoreForUser(userId);
    }

    // Optional: endpoint to submit a test result
    @PostMapping("/submit")
    public Result submitResult(@RequestBody Result result) {
        // You may want to set the submittedAt timestamp here
        result.setSubmittedAt(java.time.LocalDateTime.now());
        return resultService.saveResult(result);
    }
}