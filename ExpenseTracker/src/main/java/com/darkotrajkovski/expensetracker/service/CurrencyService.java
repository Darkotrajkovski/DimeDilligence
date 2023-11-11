package com.darkotrajkovski.expensetracker.service;

import com.darkotrajkovski.expensetracker.model.Currency;

public interface CurrencyService {

  Currency getReferenceCurrency();

  Currency updateReferenceCurrency(String newCurrency);

  String getCurrencyConvertionRates();
}
