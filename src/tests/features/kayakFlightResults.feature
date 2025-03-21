Feature: Kayak Flight Search and Results
    Background: User navigates to the application and fetches the flight results

    Scenario: User naviagtes to application and search for one way trip for 1 adult
        Given User naviagtes to the website kayak.com
        And User selects the flights category
        And User select the trip as one way
        And User selects the flight from "IAD"
        And User selects the destination to "HYD"
        And User selects the travel date as "04-Apr-2025"
        And User selects the number of adults passengers as "2"
        And User selects the Economy package
        When User clicks the search button
        Then User is navigated to the results page

    Scenario: User gets the list of price low to high
        And User confirms his flight destinations
        When User selects the tab "Cheapest"
        Then User gets the list of flights pricing low to high