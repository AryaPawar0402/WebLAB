package com.example.webapp.repository;

import com.example.webapp.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {

    // Count results for a specific test
    long countByTestId(Long testId);

    // Count results for a specific user
    long countByUserId(Long userId);

    // Find all results for a user (to calculate average)
    List<Result> findByUserId(Long userId);

    // Optional: check if user has already submitted a test
    boolean existsByUserIdAndTestId(Long userId, Long testId);
}