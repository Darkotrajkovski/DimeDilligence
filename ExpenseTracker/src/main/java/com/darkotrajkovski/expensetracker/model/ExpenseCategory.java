package com.darkotrajkovski.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExpenseCategory {

  DRINKS("Drinks"),

  FOOD("Food"),

  GROCERIES("Groceries"),

  TRAVEL("Travel"),

  BILLS("Bills"),

  CREDIT("Credit"),

  SHOPPING("Shopping");

  private final String value;
}
