package com.darkotrajkovski.expensetracker.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
  String extractEmail(String jwt);

  String generateToken(UserDetails userDetails);

  boolean isTokenValid(String token, UserDetails userDetails);
}
