package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Income;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

  Optional<List<Income>> findAllByOwnerId(Long ownerId);

  @Query("select i from Income i where year(i.date) = ?1 and month(i.date) = ?2 and i.ownerId = ?3")
  List<Income> findAllByDateAndOwnerId(Integer year, Integer month, Long ownerId);

  @Query("select i from Income i where year(i.date) = ?1 and i.ownerId = ?2")
  List<Income> findAllByYearAndOwnerId(Integer year, Long ownerId);

}