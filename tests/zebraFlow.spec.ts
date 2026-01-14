import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/home.page"
import { ProTrialPage } from "../pages/proTrial.page"
import { PricingSelectProductPage } from "../pages/pricingSelectProduct.page"
import { PRODUCTS } from "../pages/constants"

let homePage: HomePage
let proTrialPage: ProTrialPage
let pricingSelectProductPage: PricingSelectProductPage


test.describe("zebra BI test flow", () => {

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page)
    proTrialPage = new ProTrialPage(page)
    pricingSelectProductPage = new PricingSelectProductPage(page)
    await homePage.goToHomePage()
  })

  test("check if zebra logo is visible in navbar", async ({page}) => {
    await expect(homePage.navbar.zebraLogo).toBeVisible()
  })

  test("check if login link is visible in navbar", async ({page}) => {
    await expect(homePage.navbar.login).toBeVisible()
  })

  test("check if home page contains 3 try zebra bi for free buttons", async ({page}) => {
    await expect(homePage.allTryZebraBIForFreeButtons).toHaveCount(3)
  })

  test("select Zebra BI for free and check all three product buttons are available", async ({page}) => {
    await homePage.navbar.clickTryZebraBIForFreeButton()
    await proTrialPage.waitForPageLoad()

    const productList = Object.values(PRODUCTS)

    for (const product of productList) {
      await expect.soft(proTrialPage.getProductButton(product), `${product} try for free button visible`).toBeVisible()
    }
  })

  test("select pricing and check all three product buttons are available", async ({page}) => {
    await homePage.navbar.clickPricing()
    await pricingSelectProductPage.waitForPageLoad()

    const productList = Object.values(PRODUCTS)

    for (const product of productList) {
        await expect.soft(pricingSelectProductPage.getPricingPlanButton(product), `${product} pricing plan button visible`).toBeVisible()
    }
  })
})
