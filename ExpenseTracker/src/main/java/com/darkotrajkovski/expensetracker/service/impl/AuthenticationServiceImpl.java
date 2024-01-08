package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Role;
import com.darkotrajkovski.expensetracker.model.User;
import com.darkotrajkovski.expensetracker.repository.UserRepository;
import com.darkotrajkovski.expensetracker.service.AuthenticationService;
import com.darkotrajkovski.expensetracker.service.JwtService;
import com.darkotrajkovski.model.AuthenticationRequestDto;
import com.darkotrajkovski.model.AuthenticationResponseDto;
import com.darkotrajkovski.model.RegisterRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  @Override
  public AuthenticationResponseDto authenticate(AuthenticationRequestDto authenticationRequestDto) {
    String email = authenticationRequestDto.getEmail();
    String password = authenticationRequestDto.getPassword();
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

    User user = userRepository.findByEmail(email).orElseThrow();
    return getAuthenticationResponseDto(user);
  }

  @Override
  public AuthenticationResponseDto register(RegisterRequestDto registerRequestDto) {
    User user = new User();
    user.setName(registerRequestDto.getEmail());
    user.setSurname(registerRequestDto.getSurname());
    user.setEmail(registerRequestDto.getEmail());
    user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
    user.setRole(Role.USER);

    userRepository.save(user);
    return getAuthenticationResponseDto(user);
  }

  private AuthenticationResponseDto getAuthenticationResponseDto(User user) {
    String jwtToken = jwtService.generateToken(user);
    AuthenticationResponseDto authenticationResponseDto = new AuthenticationResponseDto();
    authenticationResponseDto.setUserId(user.getId());
    authenticationResponseDto.setName(user.getName());
    authenticationResponseDto.setSurname(user.getSurname());
    authenticationResponseDto.setToken(jwtToken);

    return authenticationResponseDto;
  }
}
