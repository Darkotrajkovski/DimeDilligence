package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Income;
import com.darkotrajkovski.expensetracker.model.User;
import com.darkotrajkovski.expensetracker.repository.IncomeRepository;
import com.darkotrajkovski.expensetracker.service.IncomeService;
import com.darkotrajkovski.expensetracker.service.mapper.IncomeMapper;
import com.darkotrajkovski.model.IncomeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

  private final IncomeRepository incomeRepository;
  private final IncomeMapper incomeMapper;

  @Override
  public List<IncomeDto> getAllIncomes() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (incomeRepository.findAllByOwnerId(user.getId()).isPresent()) {
      return incomeMapper.mapListToDto(incomeRepository.findAllByOwnerId(user.getId()).get());
    }
    return new ArrayList<>();
  }

  @Override
  public List<IncomeDto> getAllIncomesByDate(LocalDate date) {
    return findAllByDateAndOwnerId(date);
  }

  @Override
  public List<IncomeDto> getAllIncomesForYear(Integer year) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    List<Income> allByDate = incomeRepository.findAllByYearAndOwnerId(year, user.getId());
    return incomeMapper.mapListToDto(allByDate);
  }

  @Override
  public IncomeDto getIncomeById(Long id) {
    Optional<Income> income = incomeRepository.findById(id);
    return income.map(incomeMapper::mapToDto).orElse(null);
  }

  @Override
  public List<IncomeDto> createIncome(IncomeDto incomeDto) {
    Income income = incomeMapper.mapFromDto(incomeDto);
    incomeRepository.save(income);
    return findAllByDateAndOwnerId(LocalDate.now());
  }

  @Override
  public List<IncomeDto> updateIncome(Long id, IncomeDto incomeDto) {
    Income income = incomeMapper.mapFromDto(incomeDto);
    incomeRepository.save(income);
    return findAllByDateAndOwnerId(LocalDate.now());
  }

  @Override
  public void deleteIncome(Long id) {
    incomeRepository.deleteById(id);
  }

  private List<IncomeDto> findAllByDateAndOwnerId(LocalDate date) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    List<Income> allByDate = incomeRepository.findAllByDateAndOwnerId(date.getYear(), date.getMonthValue(), user.getId());
    return incomeMapper.mapListToDto(allByDate);
  }
}
