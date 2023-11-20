package com.darkotrajkovski.expensetracker.rest;

import com.darkotrajkovski.api.ProjectionApi;
import com.darkotrajkovski.expensetracker.service.ProjectionService;
import com.darkotrajkovski.model.ProjectionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class ProjectionController implements ProjectionApi {

  private final ProjectionService projectionService;

  @Override
  public ResponseEntity<ProjectionDto> projectionYearGet(Integer year) {
    return ResponseEntity.ofNullable(projectionService.getProjectionForYear(year));
  }
}
