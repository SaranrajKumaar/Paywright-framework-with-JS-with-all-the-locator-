import { test, expect, request } from '@playwright/test';

import { customTest } from '../API-Utlis/CustomAPIfixture';
import { create } from 'node:domain';



customTest('fixture demo', async ({ authenticationPage, createOrder,testDataOrder }) => {


  authenticationPage.goto("https://rahulshettyacademy.com/client/");
  //order 

  await authenticationPage.locator('button[routerlink="/dashboard/myorders"]').click();

  await authenticationPage.locator('tbody').waitFor();

  await expect(authenticationPage.getByText(createOrder.orderId)).toBeVisible();

  console.log(testDataOrder.productName);
s

})