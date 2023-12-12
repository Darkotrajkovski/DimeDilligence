package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

  Optional<List<Goal>> findAllByOwnerIdOrderByDateDesc(Long ownerId);
}