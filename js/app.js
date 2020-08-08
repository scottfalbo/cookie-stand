'use strict';

// random number generator
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// constructor function used to create an object for each store.
function StoreMaker(name, minCust, maxCust, avgSale, openTime, closeTime) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.openTime = openTime;
  this.closeTime = closeTime;

  this.cookiesPerHour = function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  };
}

var seattle = new StoreMaker('Seattle Store', 23, 65, 6.3, 6, 20);
var tokyo = new StoreMaker('Tokyo Store', 3, 24, 1.2, 6, 20);
var dubai = new StoreMaker('Dubai Store', 11, 38, 3.7, 6, 20);
var paris = new StoreMaker('Paris Store', 20, 38, 2.3, 6, 20);
var lima = new StoreMaker('Lima Store', 2, 16, 4.6, 6, 20);


// create an array to hold all of the objects so they can be called dynamically
var locations = [seattle, tokyo, dubai, paris, lima];
//----- end of object creation

// The outer for loop runs through the location array, the inner loops runs through the cookies per hour method of each object
//get the element
var section = document.getElementById('stores');
var total;
for (var j =0; j < locations.length; j++){
  total = 0;
  // add a <div> that will hold the other info
  var divEl = document.createElement('div');
  section.append(divEl);

  // puts an h3 heading with the object name and creates a list in the div
  var h3El = document.createElement('h3');
  h3El.appendChild(document.createTextNode(locations[j].name));
  var ulEl = document.createElement('ul');
  divEl.appendChild(h3El);
  divEl.append(ulEl);

  // add the li elements to the ul
  var liEl;
  var cookieOutput = locations[j].cookiesPerHour();
  var outPutString;
  for (var i = 0; i < (locations[j].closeTime-locations[j].openTime); i++){
    liEl = document.createElement('li');
    outPutString = `${formatTime(cookieOutput[0][i])}: ${cookieOutput[1][i]} cookies.`;
    liEl.appendChild(document.createTextNode(outPutString));
    ulEl.appendChild(liEl);
    total += cookieOutput[1][i];
  }
  liEl = document.createElement('li');
  liEl.appendChild(document.createTextNode(`Total Sold: ${total}.`));
  ulEl.appendChild(liEl);
}
// takes the 24 hour value and makes it am or pm
function formatTime(input){
  if (input < 13){
    return `${input}am`;
  } else {
    return `${input-12}pm`;
  }
}
