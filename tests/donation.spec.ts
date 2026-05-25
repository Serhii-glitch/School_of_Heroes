import { test, expect } from '@playwright/test'; 

test.beforeEach(async ({ page }) => { 
  await page.goto('https://sh-dev-site.vercel.app/en/donations'); 
  await expect(page.locator('#donation-title')).toBeVisible(); 
});

test ('e2e donation test', async ({page}) => { 

// select assistance
  const assistance = [
    'Щомісячна допомога',
    'Разова допомога'
  ];

  const random_Index = Math.floor(Math.random() * assistance.length);

  const selectedButtonText = assistance[random_Index];

  const button = page.getByText(selectedButtonText);

  await button.scrollIntoViewIfNeeded();
  await button.hover();
  await button.click();

// select a currency
  const currency = [
    'EUR',
    'USD',
    'UAH'
  ];

  const random_iindex = Math.floor(Math.random() * currency.length);

  const selectedcurrency = currency[random_iindex];

  const currencys = page.getByRole('radio', {
  name: selectedcurrency
});

  await currencys.hover();
  await currencys.click();

// select a value
  const value = [
    '100',
    '200',
    '500',
    '1000',
    '2000'
  ];

  const random_value = Math.floor(Math.random() * value.length);

  const selectedvalue = value[random_value];

  const values = page.getByRole('button', {
  name: `${selectedvalue} ${selectedcurrency}`
});

  await values.scrollIntoViewIfNeeded();
  await values.hover();
  await values.click();

// select a city
  const element = page.getByText('Оберіть місто'); 
  await element.scrollIntoViewIfNeeded(); 
  await element.click(); 
  await expect(page.getByText('Калуш Орісіл')).toBeVisible(); 
  const cities = page.locator('[class*="scrollbar"] button'); 
  const count = await cities.count(); 
  if (count === 0) throw new Error('No cities found'); 
  const randomIndex = Math.floor(Math.random() * count); 
  const selectedCity = cities.nth(randomIndex); 
  await selectedCity.scrollIntoViewIfNeeded() 
  await selectedCity.click(); 

// enter name & surname
  const name = page.getByPlaceholder('Введіть ваше ім’я'); 
  await name.scrollIntoViewIfNeeded(); await name.fill('fff'); 
  await name.press('Tab'); const sur = page.getByPlaceholder('Введіть ваше прізвище'); 
  await sur.scrollIntoViewIfNeeded(); await sur.fill('fff'); 
  await sur.press('Tab'); 

// enter phone number
  await page
  .getByPlaceholder('Введіть ваш номер телефону')
  .fill('+45 33 53 53 53');

// write an e-mail
  await page.getByPlaceholder('Введіть вашу електронну адресу').type('sdfgsdfg@gmail.com')

// press checkbox
  const check = page.locator('input[type="checkbox"]') 
  await check.scrollIntoViewIfNeeded(); 
  await check.click({ force: true });
  
  await page.waitForTimeout(2000);

// press a button
  await page.getByLabel('Відправити').click();

// check if the next page has loaded
  await page.waitForTimeout(5000);
  await expect(page.getByLabel('Privat24 Pay Button')).toBeVisible();
});