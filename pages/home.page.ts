import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"

const expectedUrl = /.*zebrabi.com/

export class HomePage extends BasePage {
    readonly allTryZebraBIForFreeButtons: Locator

    constructor(page: Page) {
        super(page)
        this.allTryZebraBIForFreeButtons = page.getByRole("link", {name: /Try Zebra BI for free/i})
    }

    async goToHomePage() {
        await this.page.goto("/")
        await this.cookieConsentAccept()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(expectedUrl)
    } 
}