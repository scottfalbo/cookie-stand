'use strict';

var seattle = {
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


//display the array in the browser
