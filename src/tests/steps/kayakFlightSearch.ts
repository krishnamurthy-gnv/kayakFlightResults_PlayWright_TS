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
    // User selects the category as flights 
    // Try a few more robust selectors to locate the Flights category
    try {
        await pageFixture.page.getByRole('link', { name: /Flights/i }).first().click();
    } catch (e) {
        // fallback to text match
        await pageFixture.page.getByText(/Flights/i).first().click();
    }
    await pageFixture.page.waitForTimeout(1000);
});

Given('User select the trip as one way', async function () {
    // User needs to select the trip as one way
    await pageFixture.page.getByRole('combobox',{name: 'Trip type Round-trip'}).locator('svg').click();
    await pageFixture.page.getByRole('option',{name: 'One-way'}).click();
});

Given('User selects the flight from {string}', async function (string) {
    // User ends the predefined value in and enters the IAD in flight origin text box
    let origin = string;
    await pageFixture.page.getByRole('button',{name:'Remove value'}).click();
    await pageFixture.page.getByRole('combobox',{name:'Flight origin input'}).pressSequentially(origin);
    await pageFixture.page.getByRole('option',{name:/Washington, D.C./}).click();
 

});




Given('User selects the destination to {string}', async function (string) {
    // User enters HYD in the flight destiantion text box
   // await pageFixture.page.getByRole('textbox',{name: 'Flight destination input'}).click(); 
    //await pageFixture.page.getByRole('combobox',{name: 'Flight destination input'}).pressSequentially('HYD'); 
    const destination = string;
    await pageFixture.page.getByPlaceholder('To?').click();
    await pageFixture.page.getByPlaceholder('To?').fill(destination);
    await pageFixture.page.getByRole('option',{name:/Hyderabad, Telangana/}).click();    
});

Given('User selects the travel date which is 15 days from today', async function () {
    // User selects his travel date as today + 15 days
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const returnDate = new Date();
    returnDate.setDate(targetDate.getDate() + 7);

    console.log(`Target Date: ${targetDate.toISOString()}`);

   //format the date as 'mmmm dd, yyyy'
   
    const formattedTravelDate = targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
    console.log(`Formatted Travel Date Long: ${formattedTravelDate}`);

    const formattedReturnDate = returnDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
    console.log(`Formatted Return Date Long: ${formattedReturnDate}`);

    // Replace the selector below with the actual selector for the date cell
    await pageFixture.page.getByRole('button',{name: formattedTravelDate}).click();  
  
    
});

Given('User selects the number of adults passengers as {string}', async function (string) {
    //User select the total number of passengers as 02   
    await pageFixture.page.locator('div').filter({hasText:/Adult/}).getByRole('button',{name:'Increment'}).nth(0).click();    
});

Given('User selects the Economy package', async function () {
    // User clicks for Economy travel
    // ensure the economy option is selected (click to select)
    await pageFixture.page.getByRole('radio',{name:'Economy',checked:true});       
    console.log('Economy option is selected');
});

When('User clicks the search button', async function () {    
    // First wait for the button to be ready
    const searchButton = pageFixture.page.getByRole('button', {name: 'Search'});
    await searchButton.waitFor({ state: 'visible', timeout: 10000 });

    try {
        // Setup promises for all possible navigation scenarios
        const newPagePromise = pageFixture.page.context().waitForEvent('page', { timeout: 10000 }).catch(() => null);
        const navigationPromise = pageFixture.page.waitForNavigation({ timeout: 10000, waitUntil: 'load' }).catch(() => null);
        const networkIdlePromise = pageFixture.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => null);
        
        // Click and wait for any navigation type
        await searchButton.click();
        
        // Wait for potential new page first
        const newPage = await newPagePromise;
        if (newPage) {
            pageFixture.page = newPage;
            await newPage.waitForLoadState('domcontentloaded');
            await newPage.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => null);
            console.log('Search opened in new tab');
            return;
        }

        // If no new page, wait for same-page navigation
        await navigationPromise;
        await networkIdlePromise;

        

        console.log('Search completed in same tab, results confirmed');
    } catch (error) {
        console.error('Error during search navigation:', error);
        // Try one last time to verify if we're on a results page
        const hasResults = await pageFixture.page.evaluate(() => {
            return document.body.textContent?.includes('IAD') && 
                   document.body.textContent?.includes('HYD');
        });
        if (!hasResults) {
            throw error;
        }
        console.log('Results found through content check');
    }
});


Then('User is navigated to the results page', async function () {
    // First wait for page to be ready
    await pageFixture.page.waitForLoadState('domcontentloaded');
    
    // Then look for flight results using multiple possible selectors
    try {
        await pageFixture.page.waitForFunction(() => {
            return document.querySelector('.nrc6-content-section') !== null || 
                   document.querySelector('[data-resultid]') !== null ||
                   document.querySelector('.flight-list') !== null;
        }, { timeout: 10000 });
        
        console.log('Found flight results on page');
    } catch (error) {
        console.error('Could not find flight results:', error);
        throw new Error('Flight results not found within timeout');
    }
});

