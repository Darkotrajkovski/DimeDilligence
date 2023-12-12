package com.darkotrajkovski.expensetracker.rest;

import com.darkotrajkovski.api.GoalsApi;
import com.darkotrajkovski.expensetracker.service.GoalsService;
import com.darkotrajkovski.model.GoalsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GoalsController implements GoalsApi {

  private final GoalsService goalsService;


  @Override
  public ResponseEntity<List<GoalsDto>> goalsGet() {
    return ResponseEntity.ofNullable(goalsService.getAllGoals());
  }

  @Override
  public ResponseEntity<GoalsDto> goalsIdGet(Long id) {
    return ResponseEntity.ofNullable(goalsService.getGoalById(id));
  }

  @Override
  public ResponseEntity<List<GoalsDto>> goalsPost(GoalsDto goalsDto) {
    return ResponseEntity.ofNullable(goalsService.createGoal(goalsDto));
  }

  @Override
  public ResponseEntity<List<GoalsDto>> goalsIdPut(Long id, GoalsDto goalsDto) {
    return ResponseEntity.ofNullable(goalsService.updateGoal(id, goalsDto));
  }

  @Override
  public ResponseEntity<Void> goalsIdDelete(Long id) {
    goalsService.deleteGoal(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
