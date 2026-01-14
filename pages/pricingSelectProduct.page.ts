import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"

const expectedUrl = /.*pricing-select-product.*/

export class PricingSelectProductPage extends BasePage {
    readonly productCards: Locator

    constructor(page: Page) {
        super(page)
        this.productCards = page.locator(".select__card")
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState("load")
        await expect(this.page).toHaveURL(expectedUrl)
    }

    getPricingPlanButton(name: string) {
        return this.productCards
            .filter({ hasText: name })
            .locator("a.select-card__btn", {hasText: /See the pricing plan/i})
    }
}