package com.darkotrajkovski.expensetracker.repository;

import com.darkotrajkovski.expensetracker.model.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {

  Currency findByOwnerId(Long ownerId);
}
