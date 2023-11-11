package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

  Optional<List<Expense>> findAllByOwnerId(Long ownerId);

  Optional<List<Expense>> findAllByDateAndOwnerId(LocalDate date, Long ownerId);

  // List<Expense> findByOwnerIdAndDateYearAndDateMonth(@Param("ownerId") Long ownerId, @Param("year") Integer year, @Param("month") Integer month);
}