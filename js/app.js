'use strict';

var seattle = {
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  custPerHour: function(){
    return Math.floor(Math.random() * 71);
  }
  //calculate and store cookies purchased per hour based on custPerHour and avgSale
  //store results in an array
};

//display the array to the browser