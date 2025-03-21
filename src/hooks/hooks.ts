import { After, AfterAll, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium} from '@playwright/test';
import { pageFixture } from "./pageFixture";

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({headless: false});
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;    
})

AfterAll(async function () {
    await pageFixture.page.close();
    await context.close();
    await browser.close();    
})