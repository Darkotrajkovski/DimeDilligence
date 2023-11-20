package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Expense;
import com.darkotrajkovski.expensetracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

  Optional<List<Expense>> findAllByOwnerIdOrderByDateDesc(Long ownerId);

  @Query("select e from Expense e where year(e.date) = ?1 and month(e.date) = ?2 and e.ownerId = ?3")
  List<Expense> findAllByDateAndOwnerId(Integer year, Integer month, Long ownerId);

  @Query("select i from Expense i where year(i.date) = ?1 and i.ownerId = ?2")
  List<Expense> findAllByYearAndOwnerId(Integer year, Long ownerId);
}