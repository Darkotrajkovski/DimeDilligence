package com.darkotrajkovski.expensetracker.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.darkotrajkovski.expensetracker.model.Income;
import com.darkotrajkovski.model.IncomeDto;

@Mapper
public interface IncomeMapper {

  IncomeDto mapToDto(Income income);
  List<IncomeDto> mapListToDto(List<Income> incomes);

  Income mapFromDto(IncomeDto incomeDto);
}
