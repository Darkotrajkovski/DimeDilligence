package com.darkotrajkovski.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GoalCategory {

  VEHICLE("Vehicle"),

  REALESTATE("RealEstate"),

  TRAVEL("Travel"),

  EDUCATION("Education"),

  HOMEIMPROVEMENT("HomeImprovement"),

  TECHNOLOGYANDGADGETS("TechnologyAndGadgets"),

  CHARITY("Charity"),

  HOBBIES("Hobbies");

  private final String value;
}
