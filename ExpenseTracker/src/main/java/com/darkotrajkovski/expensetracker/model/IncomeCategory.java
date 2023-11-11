package com.darkotrajkovski.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum IncomeCategory {

  SALARY("Salary"),

  RENT("Rent");

  private final String value;
}
