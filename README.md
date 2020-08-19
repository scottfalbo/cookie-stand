# Lab06: Salmon Cookies

### Tasks
+ **JavaScript**
+ Calculate the number of cookies each location must make every day.
+ The number of cookies to make depends on.
  + hours of operation.
  + minimum number of customers per hour.
  + maximum number of customers per hour.
  + average number of cookies purchased per customer.
+ Be able to add and remove locations from the daily report.
+ Be able to modify input numbers for each location.
+ Display information in a readable format in the browser.

+ **HTML and CSS**
+ Build a public facing site.
+ Homepage that is colorful, eye catching, readable, useful and informative.
+ Build a sales page to display above JavaScript

## Cookie Stand v1.0
*August 6th, 2020*
+ I created separate objects for the first five locations.  This clunky approach will later be replaced by a constructor function.
+ I made two small utility functions:
  + `randomNumber()` to generate a random number of customers per hour.
  + `formatTime` which takes the 24 hr format of the time held in the `hours` array and converts it to a standard 'am/pm' format for output.

+ Inside each object there is a method that generates the number of cookies sold per hour based on the number of customers and average numbers of cookies purchased based on location.  
  + The time of day and number of cookies are both stored in there own respective arrays, `hour` and `perHour` and then returned together nested in another array.

+ I put all of the objects for the locations in an array.  Then I used a `for` loop to go through to send the information from each object to the DOM.  
  + A second `for` loop was nested in the first to iterate through the `hour` and `perHour` arrays from the object methods to put each set of values into an `<ul>`.


## Cookie Stand v1.1

### Tasks
+ Replace the object literals with a constructor function.
+ Replace the `<ul>` with a table.
+ Each object should have its own method to append the DOM.
  + The header and footer row should be their own methods
+ **Stretch Goals**
+ Keep working on the public facing style
  + Use a second table to manage staffing using this info:
    + A single worker can can serve 20 customers/hr.  
    + Each location should have a minimum of two workers at all times.
  + Calculate how many workers are needed at each location each hour.
+ Apply a control curve to the projected sales numbers to reflect daily ebb and flow based on Pat's research.

*August 7, 2020*
+ I implemented a constructor function and removed all of the object literals.
+ The code feels clunky but I got everything writing to the table.
  + I used a function to print the first row of times.
  + a method of each store to print the daily sales.
  + and a function to print the last row of added up totals
  + there is a main function that calls them all

*August 8, 2020*
+ Styled my tables to make them readable.
+ added a method that calculates number of employees needed per hour and sent the information to a table.
+ Removed the methods from the constructor function and declared them using `.prototype`.
+ Got the curve method working.  Recycled the methods and functions by passing in a parameter of an element ID.

*August 13, 2020*
+ Made and style a new home page.  
+ Created a header.css to use cross pages
+ Added locations to the main page via the JavaScript.
  + Still working on getting the address to print on two lines.

*August 15, 2020*
+ Added a form to add and print additional store data.
+ Got my validation function working.  It intakes an array with all of the input values and uses a `for` loop to make sure they aren't empty.
+ Wrote a small function disallowing numbers to be entered as the name.

+ The way the functions were nested before every time a new store was created the data for the current ones would change.  I refactored a bunch of stuff so the call order is correct and the current data stays the same as new stores are added.

+ Styled the formed a little bit.  
+ Added input lines for homepage info but couldn't do anything with that information because I do not know how to store it or sent it to another HTML page yet.  
  + I turned of the content checker for the homepage info lines since the data isn't required.

*August 18th, 2020*
+ Refactored and reduced the script from 287 to 240 lines by implementing a function for the element creation.
