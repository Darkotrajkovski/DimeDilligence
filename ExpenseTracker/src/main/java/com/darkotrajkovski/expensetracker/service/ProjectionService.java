package com.darkotrajkovski.expensetracker.service;

import com.darkotrajkovski.model.ProjectionDto;

public interface ProjectionService {

    ProjectionDto getProjectionForYear(Integer year);
}
