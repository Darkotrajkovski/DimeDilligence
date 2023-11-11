package com.darkotrajkovski.expensetracker.service;


import com.darkotrajkovski.model.ExpenseDto;

import java.util.List;

public interface ExpenseService {

  List<ExpenseDto> getAllExpenses();
  ExpenseDto getExpenseById(Long id);
  List<ExpenseDto> createExpense(ExpenseDto expenseDto);
  List<ExpenseDto> updateExpense(Long id, ExpenseDto expenseDto);
  void deleteExpense(Long id);
}
