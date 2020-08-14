'use strict';

// random number generator.
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
// constructor function used to create an object for each store.
function StoreMaker(name, minCust, maxCust, avgSale, storeInfo) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.cookiesPerHour = [];
  this.totalCookies = 0;
  this.workersPerHour = [];
  //storeInfo[flag, address, phone, email, link]
  this.storeInfo = storeInfo;
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
    this.workersPerHour[i] = Math.ceil(this.workersPerHour[i]*curve[i]);
    this.cookiesPerHour[i] = Math.ceil(this.cookiesPerHour[i]*curve[i]);
    this.totalCookies += this.cookiesPerHour[i];
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
StoreMaker.prototype.homePageLocs = function(){
  var sectionMain = document.getElementById('locations');
  var sectionInner = document.createElement('section');
  sectionMain.append(sectionInner);
  var imgFlag = document.createElement('img');
  imgFlag.src = this.storeInfo[0];
  sectionInner.appendChild(imgFlag);
  var h3City = document.createElement('h3');
  h3City.textContent = this.name;
  sectionInner.appendChild(h3City);
  var address = document.createElement('address');
  address.textContent = this.storeInfo[1];
  sectionInner.appendChild(address);
  var phone = document.createElement('p');
  phone.textContent = this.storeInfo[2];
  sectionInner.appendChild(phone);
  var emailAdd = document.createElement('p');
  sectionInner.appendChild(emailAdd);
  var emailLink = document.createElement('a');
  emailLink.textContent = this.storeInfo[3];
  emailLink.href = this.storeInfo[4];
  emailAdd.appendChild(emailLink);
};

var seattle = new StoreMaker('Seattle', 23, 65, 6.3, ['images/flags/flag-seattle.jpg', '123 Whatever ST Seattle, WA 98105', '+1(206)358-1321', 'SeattleCookies@fish.net', 'mailto:#']);
var tokyo = new StoreMaker('Tokyo', 3, 24, 1.2, ['images/flags/flag-tokyo.jpg', '6 Chrome 7-1 Sendagaya, Shibuya City, Tokyo, 121-0072, Japan', '+81 3-6561-4593', 'TokyoCookies@fish.net', 'mailto:#']);
var dubai = new StoreMaker('Dubai', 11, 38, 3.7, ['images/flags/flag-dubai.jpg', 'Dubai Silicon OasisCedre Villas, Dubai - United Arab Emirates', '+971 4 666 9834', 'DubaiCookies@fish.net', 'mailto:#']);
var paris = new StoreMaker('Paris', 20, 38, 2.3, ['images/flags/flag-paris.jpg', '75093, 103 Rue de Sevres, 75006 Paris, France', '+33 6 40 36 17 85', 'ParisCookies@fish.net', 'mailto:#']);
var lima = new StoreMaker('Lima', 2, 16, 4.6, ['images/flags/flag-lima.jpg', 'Av. Petit Thouras 6657, Miraflores 15063, Peru', '+51 1 15670265', 'LimaCookies@fish.net', 'mailto:#']);

var locations = [seattle, tokyo, dubai, paris, lima];

// ----------- write homepage locs
function homePage (){
  for (var i = 0; i < locations.length; i++){
    locations[i].homePageLocs();
  }
}

// ----------- write tables
function writeToPage(tableOne, tableTwo){  // eslint-disable-line 
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
