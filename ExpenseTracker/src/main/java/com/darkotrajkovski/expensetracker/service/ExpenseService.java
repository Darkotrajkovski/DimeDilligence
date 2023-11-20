package com.darkotrajkovski.expensetracker.service;


import com.darkotrajkovski.model.ExpenseDto;
import com.darkotrajkovski.model.IncomeDto;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {

  List<ExpenseDto> getAllExpenses();
  List<ExpenseDto> getAllExpensesByDate(LocalDate date);
  List<ExpenseDto> getAllExpensesForYear(Integer year);
  ExpenseDto getExpenseById(Long id);
  List<ExpenseDto> createExpense(ExpenseDto expenseDto);
  List<ExpenseDto> updateExpense(Long id, ExpenseDto expenseDto);
  void deleteExpense(Long id);
}
