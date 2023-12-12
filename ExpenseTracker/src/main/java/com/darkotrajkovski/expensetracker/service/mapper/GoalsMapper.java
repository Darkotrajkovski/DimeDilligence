package com.darkotrajkovski.expensetracker.service.mapper;

import com.darkotrajkovski.expensetracker.model.Goal;
import com.darkotrajkovski.expensetracker.model.Income;
import com.darkotrajkovski.model.GoalsCategoryDto;
import com.darkotrajkovski.model.GoalsDto;
import com.darkotrajkovski.model.IncomeDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface GoalsMapper {

  GoalsDto mapToDto(Goal goal);
  List<GoalsDto> mapListToDto(List<Goal> goals);

  Goal mapFromDto(GoalsDto goalsDto);
}
