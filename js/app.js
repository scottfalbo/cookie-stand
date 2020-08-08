'use strict';

// random number generator.
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
// constructor function used to create an object for each store.
function StoreMaker(name, minCust, maxCust, avgSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  this.workersPerHour = [];
}
StoreMaker.prototype.cookiesSalesPerHour = function(){
  for (var i = 0; i < hours.length; i++){
    this.cookiesPerHour[i] = Math.ceil(randomNumber(this.minCust, this.maxCust) * this.avgSale);
    this.totalCookies += this.cookiesPerHour[i];
  }
};
StoreMaker.prototype.writeCookieSales = function(tableOne){
  var tableEl = document.getElementById(tableOne);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.append(thEl);
  if (tableOne === 'storeOutput'){
    this.cookiesSalesPerHour();
  }
  for (var i = 0; i < this.cookiesPerHour.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookies;
  trEl.appendChild(tdEl);
};
StoreMaker.prototype.controlCurve = function(){
  var curve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4];
  this.totalCookies = 0;
  for (var i = 0; i < curve.length; i++){
    this.workersPerHour[i] = Math.ceil(this.workersPerHour[i]);
    this.cookiesPerHour[i] = Math.ceil(this.cookiesPerHour[i]*curve[i]);
    // console.log(this.cookiesPerHour[i]);
  }
};

StoreMaker.prototype.staffing = function(tableTwo){
  var tableEl = document.getElementById(tableTwo);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.append(thEl);
  for (var i = 0; i < this.cookiesPerHour.length; i++){
    this.workersPerHour[i] = Math.ceil(this.cookiesPerHour[i]/20);
    if (this.workersPerHour[i] < 2){
      this.workersPerHour[i] = 2;
    }
    var tdEl = document.createElement('td');
    tdEl.textContent = this.workersPerHour[i];
    trEl.appendChild(tdEl);
  }
};


var seattle = new StoreMaker('Seattle Store', 23, 65, 6.3);
var tokyo = new StoreMaker('Tokyo Store', 3, 24, 1.2);
var dubai = new StoreMaker('Dubai Store', 11, 38, 3.7);
var paris = new StoreMaker('Paris Store', 20, 38, 2.3);
var lima = new StoreMaker('Lima Store', 2, 16, 4.6);

var locations = [seattle, tokyo, dubai, paris, lima];

function writeToPage(tableOne, tableTwo){
  writeTimes(tableOne, tableTwo);
  if (tableOne === 'curveCookieOutput'){
    for (var k = 0; k < locations.length; k++){
      locations[k].controlCurve();
    }
  }
  for (var i = 0; i < locations.length; i++){
    locations[i].writeCookieSales(tableOne);
    locations[i].staffing(tableTwo);
  }
  totalTotals(tableOne);
}

function totalTotals (tableOne){
  var tableEl = document.getElementById(tableOne);
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

function writeTimes(tableOne, tableTwo){
  var tableEl = document.getElementById(tableOne);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = hours[i];
    trEl.appendChild(tdEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Total';
  trEl.appendChild(thEl);
  //--
  tableEl = document.getElementById(tableTwo);
  trEl = document.createElement('tr');
  tableEl.append(trEl);
  thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
  for ( i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = hours[i];
    trEl.appendChild(tdEl);
  }
}
