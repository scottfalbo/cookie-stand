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
*August 7th, 2020*

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



