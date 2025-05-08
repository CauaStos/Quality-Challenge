import { test, expect } from "@playwright/test";

test("Clicar em um botão de compra na Fast Shop", async ({ page }) => {
  await page.goto(
    "https://site.fastshop.com.br/celular-samsung-galaxy-z-fold6-5g-512gb-12gb-ram-tela-7-6----6-3--cam--traseira-50-12-10mp-frontal-10-4mp-42063-43361/p",
  );

  const product = page.getByTestId("fs-product-title").locator("h1"); //h1 is inside product_name div
  const product_name = await product.innerText(); //Product name from h1

  await page
    .locator("section")
    .filter({
      hasNot: page.getByTestId("sticky-price-button"), //Filter out sticky button, could have done .first() but I wanted to test the main buy button
    })
    .getByTestId("buy-button")
    .filter({
      hasText: "Comprar Agora", //Differentiate from "Add to cart" button
    })
    .click();

  await expect(page).toHaveURL(/\/checkout/); //Matches /checkout

  const match_product = page.locator(".product-name a").filter({
    hasText: product_name,
  });
  await expect(match_product).toHaveCount(1);
});
