package com.darkotrajkovski.expensetracker.rest;

import com.darkotrajkovski.api.ExpenseApi;
import com.darkotrajkovski.expensetracker.service.ExpenseService;
import com.darkotrajkovski.model.ExpenseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpenseController implements ExpenseApi {

  private final ExpenseService expenseService;

  @Override
  public ResponseEntity<List<ExpenseDto>> expenseGet() {
    return ResponseEntity.ofNullable(expenseService.getAllExpenses());
  }

  @Override
  public ResponseEntity<ExpenseDto> expenseIdGet(Long id) {
    return ResponseEntity.ofNullable(expenseService.getExpenseById(id));
  }

  @Override
  public ResponseEntity<List<ExpenseDto>> expensePost(ExpenseDto expense) {
    return ResponseEntity.ofNullable(expenseService.createExpense(expense));
  }

  @Override
  public ResponseEntity<List<ExpenseDto>> expenseIdPut(Long id, ExpenseDto expense) {
    return ResponseEntity.ofNullable(expenseService.updateExpense(id, expense));
  }

  @Override
  public ResponseEntity<Void> expenseIdDelete(Long id) {
    expenseService.deleteExpense(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
