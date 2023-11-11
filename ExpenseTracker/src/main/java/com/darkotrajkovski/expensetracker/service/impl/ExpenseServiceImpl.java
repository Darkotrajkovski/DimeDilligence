package com.darkotrajkovski.expensetracker.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
  @Cacheable(value = "expenses", key = "#ownerId")
  public List<ExpenseDto> getAllExpenses() {
    if (expenseRepository.findAllByOwnerId(1L).isPresent()) {
      return expenseMapper.mapListToDto(expenseRepository.findAllByOwnerId(1L).get());
    }
    return new ArrayList<>();
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
    return getAllExpenses();
  }

  @Override
  @CacheEvict(value = "expenses", allEntries = true, key = "#ownerId")
  public List<ExpenseDto> updateExpense(Long id, ExpenseDto expenseDto) {
    Expense expense = expenseMapper.mapFromDto(expenseDto);
    expenseRepository.save(expense);
    return getAllExpenses();
  }

  @Override
  @CacheEvict(value = "expenses", allEntries = true, key = "#ownerId")
  public void deleteExpense(Long id) {
    expenseRepository.deleteById(id);
  }
}
