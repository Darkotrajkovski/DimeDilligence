package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

  Optional<List<Income>> findAllByOwnerId(Long ownerId);

  Optional<List<Income>> findAllByDateAndOwnerId(LocalDate date, Long ownerId);

  // List<Income> findByDateYearAndDateMonthAndOwnerId(int year, int month, Long ownerId);
}