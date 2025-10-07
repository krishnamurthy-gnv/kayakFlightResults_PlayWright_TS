import { After, AfterAll, AfterStep, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium} from '@playwright/test';
import { pageFixture } from "./pageFixture";

// Set a longer timeout for all steps since we're dealing with real website navigation
setDefaultTimeout(30000); // 2 minutes

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({headless: false});
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;    
})

import type { TestStepResult } from "@cucumber/messages";
import type { Pickle } from "@cucumber/messages";

AfterStep(async function (stepResult) {
    const pickle = stepResult.pickle;
    const result = stepResult.result;
    const img = await pageFixture.page.screenshot({ type: 'png', path: `./screenshots/${pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().getTime()}.png` });
    this.attach(img, 'image/png');
    // You may want to handle the screenshot result or remove 'await' if not needed
});

AfterAll(async function () {
    await pageFixture.page.close();
    await context.close();
    await browser.close();    
})