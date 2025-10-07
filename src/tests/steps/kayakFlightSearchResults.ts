import {Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixture';
import {BrowserContext,expect,Page} from '@playwright/test';


let context: BrowserContext;
let page: Page;

Given('User confirms his flight destination is {string}', async function (string) {
    // assert whether the new tab loaded has the same destination as HYD 
    // The page title may not contain the code; check body text for the destination instead
    const destiantion = string;
    const bodyText = await pageFixture.page.locator('body').innerText();
    expect(bodyText).toContain(destiantion);
   
});

When('User selects the tab {string}', async function (Cheapest) {
    //User clicks the button to Cheapest
    await pageFixture.page.getByRole('button',{name:'Cheapest'}).click();
    await pageFixture.page.waitForLoadState();
});

Then('User gets the list of flights pricing low to high', async function () {
    // get the complete list of list based on selection
    await pageFixture.page.waitForTimeout(3000);
    const flightResults = await pageFixture.page.locator('//div[@class="nrc6-content-section"]').allTextContents();
    console.log(flightResults);
});
