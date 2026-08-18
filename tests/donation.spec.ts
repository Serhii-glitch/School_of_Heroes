import { test, expect } from '@playwright/test'; 

test.beforeEach(async ({ page }) => { 
  await page.goto('/en/donations'); 
  await expect(page.locator('#donation-title')).toBeVisible(); 
});

test ('e2e donation test', async ({page}) => { 

// select assistance
  const assistanceTestIds = ['tabMonthly', 'tabOnetime'];

  const assistance_index = Math.floor(Math.random() * assistanceTestIds.length);

  const selectedTestId = assistanceTestIds[assistance_index];

  const button = page.getByTestId(selectedTestId);

  await button.scrollIntoViewIfNeeded();
  await button.hover();
  await button.click();

// select a currency
  const currency = [
    { testId: 'currencyEur', code: 'EUR' },
    { testId: 'currencyUsd', code: 'USD' },
    { testId: 'currencyUah', code: 'UAH' },
  ];

  const currency_index = Math.floor(Math.random() * currency.length);

  const selectedcurrency = currency[currency_index];

  const currencys = page.getByTestId(selectedcurrency.testId);

  await currencys.hover();
  await currencys.click();

// select a value
  const amounts = [
    { testId: 'amountOption100', value: '100' },
    { testId: 'amountOption200', value: '200' },
    { testId: 'amountOption500', value: '500' },
    { testId: 'amountOption1000', value: '1000' },
    { testId: 'amountOption2000', value: '2000' },
];

  const amountIndex = Math.floor(Math.random() * amounts.length);

  const selectedAmount  = amounts[amountIndex];

  const amountButton = page.getByTestId(selectedAmount.testId);

  await amountButton.scrollIntoViewIfNeeded();
  await amountButton.hover();
  await amountButton.click();

// select a city
  const element = page.getByTestId('citySelect'); 
  await element.scrollIntoViewIfNeeded(); 
  await element.click(); 
  await expect(page.getByText('Калуш Орісіл')).toBeVisible(); 

  const cities = page.getByTestId('cityOption'); 
  const count = await cities.count(); 
  if (count === 0) throw new Error('No cities found'); 
  const cities_Index = Math.floor(Math.random() * count); 
  const selectedCity = cities.nth(cities_Index); 
  await selectedCity.scrollIntoViewIfNeeded() 
  await selectedCity.click(); 

// enter name & surname
  const name = page.getByTestId('firstNameInput'); 
  await name.scrollIntoViewIfNeeded(); await name.fill('ff'); 
  await name.press('Tab'); 
  const sur = page.getByTestId('lastNameInput'); 
  await sur.scrollIntoViewIfNeeded(); 
  await sur.fill('fff'); 
  await sur.press('Tab'); 

// enter phone number
  await page
  .getByTestId('phoneInput')
  .fill('+45 33 53 53 53');

// write an e-mail
  await page.getByTestId('emailInput').fill('sdfgsdfg@gmail.com')

// press checkbox
  const check = page.getByTestId('agreementCheckbox');
  const checkboxInput = check.locator('input[type="checkbox"]');
  await checkboxInput.scrollIntoViewIfNeeded(); 
  await checkboxInput.click({ force: true });
  
  await page.waitForTimeout(2000);

// press a button
  await page.getByTestId('submitButton').click();

// check if the next page has loaded
  await page.getByTestId('privat_pay_btn').waitFor();
  await expect(page.getByLabel('Privat24 Pay Button')).toBeVisible();
});