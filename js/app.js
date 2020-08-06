'use strict';

var seattle = {
  name: 'Seattle Cookie Shop',
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  openTime: 6,
  closeTime: 20,
  // generates a random number of customers within the min, max range
  custPerHour: function(){
    var custPer = Math.floor(Math.random() * 101);
    while (custPer < this.minCust || custPer > this.maxCust){
      custPer = Math.floor(Math.random() * 101);
    }
    return custPer;
  },
  // returns an array with two arrays inside.  The inner arrays hold the hour of the day and the number of cookies sold in related index ids
  cookiesPerHour: function(){
    var perHour = [];
    var hour = [];
    for (var i = this.openTime; i < this.closeTime; i++){
      perHour[i - this.openTime] = (this.custPerHour() * this.avgSale).toFixed(0);
      hour[i - this.openTime] = i;
    }
    return [hour, perHour];
  }
};

//get the element
var section = document.getElementById('stores');
// add a <div> that will hold the other info
var divEl = document.createElement('div');
section.append(divEl);

// puts an h3 heading with the object name and creates a list in the div
var h3El = document.createElement('h3');
h3El = seattle.name;
var ulEl = document.createElement('ul');
divEl.append(h3El);
divEl.append(ulEl);

// add the li elements to the ul
var liEl = document.createElement('li');
liEl.appendChild(document.createTextNode('test'));
ulEl.appendChild(liEl);
// var cookieOutput = seattle.cookiesPerHour();

// for (var i = 0; i < (seattle.closeTime-seattle.openTime); i++){
//   liEl = `${cookieOutput[0][i]}: ${cookieOutput[1][i]} cookies.`;
//   ulEl.append(liEl);
// }
