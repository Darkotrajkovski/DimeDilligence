package com.darkotrajkovski.expensetracker.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.darkotrajkovski.expensetracker.model.Income;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.darkotrajkovski.expensetracker.model.Expense;
import com.darkotrajkovski.expensetracker.repository.ExpenseRepository;
import com.darkotrajkovski.expensetracker.service.ExpenseService;
import com.darkotrajkovski.expensetracker.service.mapper.ExpenseMapper;
import com.darkotrajkovski.model.ExpenseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

  private final ExpenseRepository expenseRepository;
  private final ExpenseMapper expenseMapper;

  @Override
  public List<ExpenseDto> getAllExpenses() {
    Optional<List<Expense>> expenses = expenseRepository.findAllByOwnerIdOrderByDateDesc(1L);
    if (expenses.isPresent()) {
      return expenseMapper.mapListToDto(expenses.get());
    }
    return new ArrayList<>();
  }

  @Override
  @Cacheable(value = "expenses", key = "#ownerId")
  public List<ExpenseDto> getAllExpensesByDate(LocalDate date) {
    return findAllByDateAndOwnerId(date);
  }

  @Override
  public List<ExpenseDto> getAllExpensesForYear(Integer year) {
    List<Expense> allByDate = expenseRepository.findAllByYearAndOwnerId(year, 1L);
    return expenseMapper.mapListToDto(allByDate);
  }

  @Override
  public ExpenseDto getExpenseById(Long id) {
    Optional<Expense> expense = expenseRepository.findById(id);
    return expense.map(expenseMapper::mapToDto).orElse(null);
  }

  @Override
  @CacheEvict(value = "expenses", allEntries = true, key = "#ownerId")
  public List<ExpenseDto> createExpense(ExpenseDto expenseDto) {
    Expense expense = expenseMapper.mapFromDto(expenseDto);
    expenseRepository.save(expense);
    return findAllByDateAndOwnerId(LocalDate.now());
  }

  @Override
  @CacheEvict(value = "expenses", allEntries = true, key = "#ownerId")
  public List<ExpenseDto> updateExpense(Long id, ExpenseDto expenseDto) {
    Expense expense = expenseMapper.mapFromDto(expenseDto);
    expenseRepository.save(expense);
    return findAllByDateAndOwnerId(LocalDate.now());
  }

  @Override
  @CacheEvict(value = "expenses", allEntries = true, key = "#ownerId")
  public void deleteExpense(Long id) {
    expenseRepository.deleteById(id);
  }

  private List<ExpenseDto> findAllByDateAndOwnerId(LocalDate date) {
    List<Expense> allByDate = expenseRepository.findAllByDateAndOwnerId(date.getYear(), date.getMonthValue(), 1L);
    return expenseMapper.mapListToDto(allByDate);
  }
}
