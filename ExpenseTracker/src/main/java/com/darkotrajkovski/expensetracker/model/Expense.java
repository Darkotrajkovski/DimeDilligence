package com.darkotrajkovski.expensetracker.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Expense {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long ownerId;
  private BigDecimal amount;
  private String currency;
  private String description;
  private String place;
  private String comment;
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate date;
  @Enumerated(EnumType.STRING)
  private ExpenseCategory category;

}