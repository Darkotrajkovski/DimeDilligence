package com.darkotrajkovski.expensetracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Goal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long ownerId;
  private BigDecimal amount;
  private String currency;
  private String description;
  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
  private LocalDate date;
  @Enumerated(EnumType.STRING)
  private GoalCategory category;

}