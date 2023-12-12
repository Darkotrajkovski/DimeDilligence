package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Goal;
import com.darkotrajkovski.expensetracker.repository.GoalRepository;
import com.darkotrajkovski.expensetracker.service.GoalsService;
import com.darkotrajkovski.expensetracker.service.mapper.GoalsMapper;
import com.darkotrajkovski.model.GoalsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalsServiceImpl implements GoalsService {

  private final GoalRepository goalRepository;
  private final GoalsMapper goalsMapper;

  @Override
  public List<GoalsDto> getAllGoals() {
    Optional<List<Goal>> goals = goalRepository.findAllByOwnerIdOrderByDateDesc(1L);
    if (goals.isPresent()) {
      return goalsMapper.mapListToDto(goals.get());
    }
    return new ArrayList<>();
  }

  @Override
  public GoalsDto getGoalById(Long id) {
    return null;
  }

  @Override
  public List<GoalsDto> createGoal(GoalsDto goalsDto) {
    Goal goal = goalsMapper.mapFromDto(goalsDto);
    goalRepository.save(goal);
    return getAllGoals();
  }

  @Override
  public List<GoalsDto> updateGoal(Long id, GoalsDto goalsDto) {
    Goal goal = goalsMapper.mapFromDto(goalsDto);
    goalRepository.save(goal);
    return getAllGoals();
  }

  @Override
  public void deleteGoal(Long id) {
    goalRepository.deleteById(id);
  }
}
