package com.darkotrajkovski.expensetracker.service;

import com.darkotrajkovski.model.GoalsDto;
import com.darkotrajkovski.model.IncomeDto;

import java.time.LocalDate;
import java.util.List;

public interface GoalsService {

  List<GoalsDto> getAllGoals();
  GoalsDto getGoalById(Long id);
  List<GoalsDto> createGoal(GoalsDto incomeDto);
  List<GoalsDto> updateGoal(Long id, GoalsDto incomeDto);
  void deleteGoal(Long id);

}
