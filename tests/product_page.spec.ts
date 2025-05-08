import { test, expect } from "@playwright/test";

test("Clicar em um botão de compra na FastShop", async ({ page }) => {
  // Navigate to the product page
  await page.goto(
    "https://site.fastshop.com.br/celular-samsung-galaxy-z-fold6-5g-512gb-12gb-ram-tela-7-6----6-3--cam--traseira-50-12-10mp-frontal-10-4mp-42063-43361/p",
  );

  // Get the product name from the h1 element inside the product title div
  const product = page.getByTestId("fs-product-title").locator("h1");
  const productName = await product.innerText();

  // Locate and click the main "Buy Now" button (not the sticky one)
  await page
    .locator("section")
    .filter({
      hasNot: page.getByTestId("sticky-price-button"), // Avoid sticky button
    })
    .getByTestId("buy-button")
    .filter({
      hasText: "Comprar Agora", // Avoid "Add to cart" button
    })
    .click();

  // Ensure we're redirected to the checkout page
  await expect(page).toHaveURL(/\/checkout/); //Matches any URL with /checkout

  // Check that the product name appears in the checkout.
  const matchProduct = page.locator(".product-name a").filter({
    hasText: productName,
  });

  // Assert that the product appears exactly once in the checkout
  await expect(matchProduct).toHaveCount(1);
});
