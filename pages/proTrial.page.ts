import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"

const expectedUrl = /.*pro-trial.*/

export class ProTrialPage extends BasePage {
    readonly productCards: Locator

    constructor(page: Page) {
        super(page)
        this.productCards = page.locator(".select__card")
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState("load")
        await expect(this.page).toHaveURL(expectedUrl)
    }

    getProductButton(name: string) {
        return this.productCards
            .filter({ hasText: name })
            .locator("a.select-card__btn", {hasText: /Get Started for FREE/i})
    }
}