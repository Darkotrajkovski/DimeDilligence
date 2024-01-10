package com.darkotrajkovski.expensetracker.service;


import com.darkotrajkovski.model.AuthenticationRequestDto;
import com.darkotrajkovski.model.AuthenticationResponseDto;
import com.darkotrajkovski.model.RegisterRequestDto;
import org.springframework.http.HttpStatus;

public interface AuthenticationService {


  AuthenticationResponseDto authenticate(AuthenticationRequestDto authenticationRequestDto);

  HttpStatus register(RegisterRequestDto registerRequestDto);
}
