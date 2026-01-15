import { Page, Locator } from "@playwright/test"

export class Navbar {
    readonly page: Page
    readonly zebraLogo: Locator
    readonly pricing: Locator
    readonly login: Locator
    readonly tryZebraBIForFreeButton: Locator
    
    constructor(page: Page) {
        this.page = page
        const header = page.locator("header")
        this.zebraLogo = header.locator(".ct-image.zebra-bi-logo")
        this.pricing = header.getByRole("link", {name: "Pricing", exact: true})
        this.login = header.getByRole("link", {name: "Login", exact: true})
        this.tryZebraBIForFreeButton = header.getByRole("link", {name: /Try Zebra BI for free/i})
    }

    async clickTryZebraBIForFreeButton() {
        await this.tryZebraBIForFreeButton.click()
    }

    async clickPricing() {
        await this.pricing.click()
    }
}