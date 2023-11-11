package com.darkotrajkovski.expensetracker.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/darko")
public class Sample {


  @GetMapping
  public String user() {
    return "Hello guest";
  }
}
