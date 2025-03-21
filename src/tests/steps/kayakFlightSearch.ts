import {Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixture';
import {BrowserContext,expect,Page} from '@playwright/test';

let context: BrowserContext;
let page: Page;

Given('User naviagtes to the website kayak.com', async function () {
    // User naviagtes to the website kayak.com and waits for its load state
    await pageFixture.page.goto("https://www.kayak.com");
    await pageFixture.page.waitForLoadState();
});

Given('User selects the flights category', async function () {
    // User selects the ategory as flights 
    await pageFixture.page.getByRole('link',{name:'Search for flights'}).nth(1).click();
});

Given('User select the trip as one way', async function () {
    // User needs to select the trip as one way
    await pageFixture.page.getByRole('combobox',{name: 'Trip type Round-trip'}).locator('svg').click();
    await pageFixture.page.getByRole('option',{name: 'One-way'}).click();
});

Given('User selects the flight from {string}', async function (string) {
    // User ends the predefined value in and enters the IAD in flight origin text box
    await pageFixture.page.getByRole('button',{name:'Remove value'}).click();
    await pageFixture.page.getByRole('textbox',{name:'Flight origin input'}).fill('IAD');
    await pageFixture.page.getByRole('option',{name:/Washington, D.C./}).click();
});

Given('User selects the destination to {string}', async function (string) {
    // User enters HYD in the flight destiantion text box
    await pageFixture.page.getByRole('textbox',{name: 'Flight destination input'}).click(); 
    await pageFixture.page.getByRole('textbox',{name: 'Flight destination input'}).pressSequentially('HYD'); 
    await pageFixture.page.getByRole('option',{name:/Hyderabad, Telangana/}).click();    
});

Given('User selects the travel date as {string}', async function (string) {
    // User selects his travel date as April 09 2025
    await pageFixture.page.getByRole('button',{name: /April 9, 2025/}).click();    
});

Given('User selects the number of adults passengers as {string}', async function (string) {
    //User select the total number of passengers as 02   
    await pageFixture.page.locator('div').filter({hasText:/Adult/}).getByRole('button',{name:'Increment'}).nth(0).click();    
});

Given('User selects the Economy package', async function () {
    // User clicks for Economy travel
    await pageFixture.page.getByRole('radio',{name:'Economy',checked:true});    
});

When('User clicks the search button', async function () {    
/*
Use page.context(): Since context isn't available directly, we get it from pageFixture.page.context().
Use pageFixture.page Properly: Ensure pageFixture is correctly initialized in your Cucumber hooks.
Handle Errors Gracefully: .catch(() => null) prevents failures if a page event doesn't happen.
Bring New Page to Front: await newPage.bringToFront(); ensures the script interacts with the correct tab.
*/

page = pageFixture.page;
const context = page.context();   

const [newPage] = await Promise.all([
    context.waitForEvent("page").catch(() => null), // Capture new page if opened
    await pageFixture.page.getByRole('button',{name:'Search'}).click(), // Replace with your button selector
    pageFixture.page.waitForLoadState()// Handle same-tab navigation
]);

if (newPage) {
    pageFixture.page = newPage; // Use the new tab
    console.log('A new tab opened!');
} else {
    // Stay on the same tab   
    console.log('No new tab, loading in the same tab!');
} 
});


Then('User is navigated to the results page', async function () {
    // wait for the page to load
    await pageFixture.page.waitForTimeout(2000);
});

Given('User confirms his flight destinations', async function () {
    // assert whether the new tab loaded has the same destination as HYD 
    expect(await pageFixture.page.title()).toContain('HYD');
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
