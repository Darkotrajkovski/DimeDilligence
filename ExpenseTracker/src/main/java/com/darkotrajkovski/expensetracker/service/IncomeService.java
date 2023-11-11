package com.darkotrajkovski.expensetracker.service;

import com.darkotrajkovski.model.IncomeDto;

import java.util.List;

public interface IncomeService {

  List<IncomeDto> getAllIncomes();
  IncomeDto getIncomeById(Long id);
  List<IncomeDto> createIncome(IncomeDto incomeDto);
  List<IncomeDto> updateIncome(Long id, IncomeDto incomeDto);
  void deleteIncome(Long id);

}
