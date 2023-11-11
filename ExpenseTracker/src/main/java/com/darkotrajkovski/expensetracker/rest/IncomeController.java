package com.darkotrajkovski.expensetracker.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.darkotrajkovski.api.IncomeApi;
import com.darkotrajkovski.expensetracker.service.IncomeService;
import com.darkotrajkovski.model.IncomeDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class IncomeController implements IncomeApi {

  private final IncomeService incomeService;

  @Override
  public ResponseEntity<List<IncomeDto>> incomeGet() {
    return ResponseEntity.ofNullable(incomeService.getAllIncomes());
  }

  @Override
  public ResponseEntity<IncomeDto> incomeIdGet(Long id) {
    return ResponseEntity.ofNullable(incomeService.getIncomeById(id));
  }

  @Override
  public ResponseEntity<List<IncomeDto>> incomePost(IncomeDto income) {
    return ResponseEntity.ofNullable(incomeService.createIncome(income));
  }

  @Override
  public ResponseEntity<List<IncomeDto>> incomeIdPut(Long id, IncomeDto income) {
    return ResponseEntity.ofNullable(incomeService.updateIncome(id, income));
  }

  @Override
  public ResponseEntity<Void> incomeIdDelete(Long id) {
    incomeService.deleteIncome(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
