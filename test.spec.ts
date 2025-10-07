// import {Page, Browser} from "@playwright/test";
// import { pageFixture } from '../../hooks/pageFixture';
// import {BrowserContext,expect} from '@playwright/test';
// let context: BrowserContext;
// let page: Page;

// WheelEvent('User saerch for the hotels', async function () {
//     // User clicks the search button to search for the flights
//     context = pageFixture.page.context();
//     const [newPage] = await Promise.all([
//         context.waitForEvent('page').catch(() => null), // Wait for a new page to open
//         pageFixture.page.getByRole('button',{name:'Search'}).click() // Click the search button
//     ]); 
//     if (newPage) {
//         pageFixture.page = newPage; // Switch to the new page if it opened
//         await newPage.bringToFront(); // Bring the new page to the front
//         console.log('A new tab opened!');
//     } else {
//         // Stay on the same tab
//         console.log('No new tab, staying on the same tab!');
//     }


//     await pageFixture.page.waitForLoadState();
//     await pageFixture.page.waitForTimeout(2000);
// }
// );
