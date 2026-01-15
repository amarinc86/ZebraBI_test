import { Page, Locator } from "@playwright/test"
import { Navbar } from "./components/navbar"

export class BasePage {
    readonly page: Page
    readonly navbar: Navbar
    readonly allowAllBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.navbar = new Navbar(page)
        this.allowAllBtn = page.getByRole("button", {name: /Allow all/i})
    }
    
    async cookieConsentAccept() {
        try {
            await this.allowAllBtn.click({timeout: 1000})
        } catch (e) {
            console.log("No cookie consent. Skip. Error: ", e)
        }
    }
}