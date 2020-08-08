'use strict';

// random number generator
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// constructor function used to create an object for each store.
function StoreMaker(name, minCust, maxCust, avgSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  this.cookiesSalesPerHour = function(){
    for (var i = 0; i < 14; i++){
      this.cookiesPerHour[i] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
      this.totalCookies += this.cookiesPerHour[i];
    }
  };
  this.writeCookieSales = function(){
    var tableEl = document.getElementById('storeOutput');
    var trEl = document.createElement('tr');
    tableEl.append(trEl);
    var thEl = document.createElement('th');
    thEl.textContent = this.name;
    trEl.append(thEl);
    this.cookiesSalesPerHour();
    for (var i = 0; i < this.cookiesPerHour.length; i++){
      var tdEl = document.createElement('td');
      tdEl.textContent = this.cookiesPerHour[i];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookies;
    trEl.appendChild(tdEl);
  };
  this.controlCurve = function(){
    // apply a control curve based on % of customers per hour
  };
  this.staffing = function(){
    // figure out how many workers are needed each hour based on number of sales
  };
}

var seattle = new StoreMaker('Seattle Store', 23, 65, 6.3);
var tokyo = new StoreMaker('Tokyo Store', 3, 24, 1.2);
var dubai = new StoreMaker('Dubai Store', 11, 38, 3.7);
var paris = new StoreMaker('Paris Store', 20, 38, 2.3);
var lima = new StoreMaker('Lima Store', 2, 16, 4.6);

var locations = [seattle, tokyo, dubai, paris, lima];

function writeToPage(){
  writeTimes();
  for (var i = 0; i < locations.length; i++){
    locations[i].writeCookieSales();
  }
  totalTotals();
}

function totalTotals (){
  var tableEl = document.getElementById('storeOutput');
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
  var allTotals = [];
  for (var i = 0; i < locations.length; i++){
    allTotals[i] = locations[i].cookiesPerHour;
  }
  var hourlyTotal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var grandTotal = 0;
  for (var j = 0; j < allTotals[0].length; j++){
    for (var k = 0; k < allTotals.length; k++){
      hourlyTotal[j] += (allTotals[k][j]);
      grandTotal += (allTotals[k][j]);
    }
  }
  for (var l = 0; l < hourlyTotal.length; l++){
    var tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotal[l];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);
}

function writeTimes(){
  var tableEl = document.getElementById('storeOutput');
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  for (var i = 5; i < 21; i++){
    var thEl = document.createElement('th');
    if (i === 5){
      thEl.textContent = '';
    } else if (i < 12){
      thEl.textContent = `${i}am`;
    } else if (i === 12) {
      thEl.textContent = `${i}pm`;
    } else if (i === 20){
      thEl.textContent = 'Daily Total';
    } else {
      thEl.textContent = `${i-12}pm`;
    }
    trEl.appendChild(thEl);
  }
}
