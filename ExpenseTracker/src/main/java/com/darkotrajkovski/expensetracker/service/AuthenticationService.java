package com.darkotrajkovski.expensetracker.service;


import com.darkotrajkovski.model.AuthenticationRequestDto;
import com.darkotrajkovski.model.AuthenticationResponseDto;
import com.darkotrajkovski.model.RegisterRequestDto;

public interface AuthenticationService {


  AuthenticationResponseDto authenticate(AuthenticationRequestDto authenticationRequestDto);

  AuthenticationResponseDto register(RegisterRequestDto registerRequestDto);
}
