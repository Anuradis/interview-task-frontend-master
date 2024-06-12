# Bus stops interview task

## Functionality Overview

Entry Page - Viewing Bus Lines at http://localhost:8080:

Users see the "Timetable" page with navigation links for "Bus Lines" and "Stops", where "Bus Lines" is active.
"Bus Lines" are listed in ascending order.
Clicking a bus line reveals "Bus Stops", sorted by default and sortable by stop order.
Selecting a bus stop displays "Time" entries, sorted in ascending order.
Stops Page - Viewing Stops at http://localhost:8080/stops:

Users see the "Timetable" page with navigation links for "Bus Lines" and "Stops", where "Stops" is active.
A search bar filters "Bus Stops", initially showing all stops sorted by default.
Users can sort "Bus Stops" by stop order using an icon.


## Notes

This app was created as part of an interview task to allow users to preview bus data.

The layout adheres to a 1:1 mock-up provided in the exercise.

Here is a list of possible improvements that weren't mentioned in the requirements and weren't implemented due to time constraints:

- Todos with debounce and search components that were partially completed.
- Loading spinner while filtering the list; however, with the current number of records, it wouldn't be noticeably beneficial.
- Transition/animations for elements such as table and tab switching.
- Possible improvements in style organization; currently, most reusable classes are related to spacing.
- Omission of void return type intentionally (further explanation available upon request).

I have also included comments providing insights into the coding exercise and explanations. One of them involves modifying package.json, with the original (currently unused) version retained under the filename packagejsonInitialCopy.json as a reference, more upon request.

## Requirements

All requirements listed here can be reviewed and checked against in the root repository from which this exercise was forked. Source code is not provided to prevent plagiarism in the future.

## Required open ports in environment

`8080` - for the Vue application <br/>
`3000` - for the API server

## How to start environment

1. `npm install` - install dependencies
2. `npm run api` - run the API
3. `npm run serve` - for the Vue application
4. `npm run test:unit` - for running unit test suite