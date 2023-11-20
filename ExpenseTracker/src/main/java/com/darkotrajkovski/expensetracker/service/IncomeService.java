package com.darkotrajkovski.expensetracker.service;

import com.darkotrajkovski.model.IncomeDto;

import java.time.LocalDate;
import java.util.List;

public interface IncomeService {

  List<IncomeDto> getAllIncomes();
  List<IncomeDto> getAllIncomesByDate(LocalDate date);
  List<IncomeDto> getAllIncomesForYear(Integer year);
  IncomeDto getIncomeById(Long id);
  List<IncomeDto> createIncome(IncomeDto incomeDto);
  List<IncomeDto> updateIncome(Long id, IncomeDto incomeDto);
  void deleteIncome(Long id);

}
