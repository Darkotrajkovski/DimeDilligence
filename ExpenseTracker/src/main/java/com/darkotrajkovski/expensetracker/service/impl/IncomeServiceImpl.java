package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Income;
import com.darkotrajkovski.expensetracker.repository.IncomeRepository;
import com.darkotrajkovski.expensetracker.service.IncomeService;
import com.darkotrajkovski.expensetracker.service.mapper.IncomeMapper;
import com.darkotrajkovski.model.IncomeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

  private final IncomeRepository incomeRepository;
  private final IncomeMapper incomeMapper;

  @Override
  @Cacheable(value = "incomes", key = "#ownerId")
  public List<IncomeDto> getAllIncomes() {
    if (incomeRepository.findAllByOwnerId(1L).isPresent()) {
      return incomeMapper.mapListToDto(incomeRepository.findAllByOwnerId(1L).get());
    }
    return new ArrayList<>();
  }

  @Override
  public IncomeDto getIncomeById(Long id) {
    Optional<Income> income = incomeRepository.findById(id);
    return income.map(incomeMapper::mapToDto).orElse(null);
  }

  @Override
  @CacheEvict(value = "incomes", allEntries = true, key = "#ownerId")
  public List<IncomeDto> createIncome(IncomeDto incomeDto) {
    Income income = incomeMapper.mapFromDto(incomeDto);
    incomeRepository.save(income);
    return getAllIncomes();
  }

  @Override
  @CacheEvict(value = "incomes", allEntries = true, key = "#ownerId")
  public List<IncomeDto> updateIncome(Long id, IncomeDto incomeDto) {
    Income income = incomeMapper.mapFromDto(incomeDto);
    incomeRepository.save(income);
    return getAllIncomes();
  }

  @Override
  @CacheEvict(value = "incomes", allEntries = true, key = "#ownerId")
  public void deleteIncome(Long id) {
    incomeRepository.deleteById(id);
  }
}
