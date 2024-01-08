package com.darkotrajkovski.expensetracker.rest;

import com.darkotrajkovski.api.AuthenticationApi;
import com.darkotrajkovski.expensetracker.service.AuthenticationService;
import com.darkotrajkovski.model.AuthenticationRequestDto;
import com.darkotrajkovski.model.AuthenticationResponseDto;
import com.darkotrajkovski.model.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController implements AuthenticationApi {

  private final AuthenticationService authenticationService;

  @Override
  public ResponseEntity<AuthenticationResponseDto> authenticationAuthenticatePost(
      AuthenticationRequestDto authenticationRequestDto) {

    return ResponseEntity.ok(authenticationService.authenticate(authenticationRequestDto));
  }

  @Override
  public ResponseEntity<AuthenticationResponseDto> authenticationRegisterPost(RegisterRequestDto registerRequestDto) {
    return ResponseEntity.ok(authenticationService.register(registerRequestDto));
  }
}
