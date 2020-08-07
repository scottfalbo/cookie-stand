'use strict';

// random number generator
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Each location object
// Seattle Store
var seattle = {
  name: 'Seattle Store',
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  openTime: 6,
  closeTime: 20,
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};
// Tokyo Store
var toyko = {
  name: 'Tokyo Store',
  minCust: 3,
  maxCust: 24,
  avgSale: 1.2,
  openTime: 6,
  closeTime: 20,
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};
// Dubai Store
var dubai = {
  name: 'Dubai Store',
  minCust: 11,
  maxCust: 38,
  avgSale: 3.7,
  openTime: 6,
  closeTime: 20,
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};
// Paris Store
var paris = {
  name: 'Paris Store',
  minCust: 20,
  maxCust: 38,
  avgSale: 2.3,
  openTime: 6,
  closeTime: 20,
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};
// Lima Store
var lima = {
  name: 'Lima Store',
  minCust: 2,
  maxCust: 16,
  avgSale: 4.6,
  openTime: 6,
  closeTime: 20,
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};
// create an array to hold all of the objects so they can be called dynamically
var locations = [seattle, toyko, dubai, paris, lima];
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
