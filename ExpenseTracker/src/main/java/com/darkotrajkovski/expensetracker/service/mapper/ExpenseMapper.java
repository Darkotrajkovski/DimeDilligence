package com.darkotrajkovski.expensetracker.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.darkotrajkovski.expensetracker.model.Expense;
import com.darkotrajkovski.model.ExpenseDto;

@Mapper
public interface ExpenseMapper {

  ExpenseDto mapToDto(Expense expense);
  List<ExpenseDto> mapListToDto(List<Expense> expenses);
  Expense mapFromDto(ExpenseDto expenseDto);
}
