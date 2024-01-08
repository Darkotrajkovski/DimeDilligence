package com.darkotrajkovski.expensetracker.service.impl;

import com.darkotrajkovski.expensetracker.model.Currency;
import com.darkotrajkovski.expensetracker.model.User;
import com.darkotrajkovski.expensetracker.repository.CurrencyRepository;
import com.darkotrajkovski.expensetracker.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

  private final CurrencyRepository currencyRepository;

  @Override
  public Currency getReferenceCurrency() {

    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return currencyRepository.findByOwnerId(user.getId());
  }

  @Override
  @CacheEvict(value = "referenceCurrency", allEntries = true, key = "#ownerId")
  public Currency updateReferenceCurrency(String newCurrency) {
    Currency referenceCurrency = getReferenceCurrency();
    referenceCurrency.setReferenceCurrency(newCurrency);
    return currencyRepository.save(referenceCurrency);
  }

  @Override
  public String getCurrencyConvertionRates() {
    return null;
  }
}
