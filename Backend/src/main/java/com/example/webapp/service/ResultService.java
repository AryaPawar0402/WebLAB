package com.example.webapp.service;

import com.example.webapp.model.Result;
import com.example.webapp.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    public long countAllResults() {
        return resultRepository.count();
    }

    public long countByUserId(Long userId) {
        return resultRepository.countByUserId(userId);
    }

    public double getAverageScoreForUser(Long userId) {
        List<Result> results = resultRepository.findByUserId(userId);
        if (results.isEmpty()) return 0.0;
        int total = results.stream().mapToInt(Result::getScore).sum();
        return (double) total / results.size();
    }

    public Result saveResult(Result result) {
        return resultRepository.save(result);
    }
}