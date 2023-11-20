package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Expense;
import com.darkotrajkovski.expensetracker.repository.ExpenseRepository;
import com.darkotrajkovski.expensetracker.service.ExpenseService;
import com.darkotrajkovski.expensetracker.service.IncomeService;
import com.darkotrajkovski.expensetracker.service.ProjectionService;
import com.darkotrajkovski.expensetracker.service.mapper.ExpenseMapper;
import com.darkotrajkovski.expensetracker.service.mapper.IncomeMapper;
import com.darkotrajkovski.model.ExpenseDto;
import com.darkotrajkovski.model.IncomeDto;
import com.darkotrajkovski.model.ProjectionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class ProjectionServiceImpl implements ProjectionService {

  private final IncomeService incomeService;
  private final ExpenseService expenseService;
  private final IncomeMapper incomeMapper;
  private final ExpenseMapper expenseMapper;

  @Override
  public ProjectionDto getProjectionForYear(Integer year) {
    List<IncomeDto> allIncomesForYear = incomeService.getAllIncomesForYear(year);

    // Create a map with month as key and sum of amounts for that month
    Map<Integer, BigDecimal> incomeMonthlySumMap = allIncomesForYear.stream()
            .collect(Collectors.groupingBy(
                    income -> income.getDate().getMonthValue(),
                    Collectors.reducing(BigDecimal.ZERO, IncomeDto::getAmount, BigDecimal::add)
            ));

    // Create a list of 12 values, one for each month
    List<BigDecimal> incomeMonthlySums = IntStream.rangeClosed(1, 12)
            .mapToObj(month -> incomeMonthlySumMap.getOrDefault(month, BigDecimal.ZERO))
            .toList();

    List<ExpenseDto> allExpensesForYear = expenseService.getAllExpensesForYear(year);

    // Create a map with month as key and sum of amounts for that month
    Map<Integer, BigDecimal> expenseMonthlySumMap = allExpensesForYear.stream()
            .collect(Collectors.groupingBy(
                    expense -> expense.getDate().getMonthValue(),
                    Collectors.reducing(BigDecimal.ZERO, ExpenseDto::getAmount, BigDecimal::add)
            ));

    // Create a list of 12 values, one for each month
    List<BigDecimal> expenseMonthlySums = IntStream.rangeClosed(1, 12)
            .mapToObj(month -> expenseMonthlySumMap.getOrDefault(month, BigDecimal.ZERO))
            .collect(Collectors.toList());

    ProjectionDto projectionDto = new ProjectionDto();
    projectionDto.setIncomes(incomeMonthlySums);
    projectionDto.setExpenses(expenseMonthlySums);
    return projectionDto;
  }
}
