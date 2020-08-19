'use strict';

// random number generator.
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var locations = [];
var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var curve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4];

// constructor function used to create an object for each store.
function StoreMaker(name, minCust, maxCust, avgSale, storeInfo) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.cookiesPerHour = [];
  this.curveCookiesPerHour = [];
  this.totalCookies = 0;
  this.workersPerHour = [];
  this.curveWorkersPerHour = [];
  this.curveTotalCookies = 0;
  //storeInfo[address, phone, email, link]
  this.storeInfo = storeInfo;
  locations.push(this);
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
  createElement('th', this.name, trEl);
  if (tableOne === 'storeOutput'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){
      createElement('td', this.cookiesPerHour[i], trEl);
    }
    createElement('td', this.totalCookies, trEl);
  }
  if (tableOne === 'curveCookieOutput'){
    for (var i = 0; i < this.curveCookiesPerHour.length; i++){ // eslint-disable-line 
      createElement('td', this.curveCookiesPerHour[i], trEl);
    }
    createElement('td', this.curveTotalCookies, trEl);
  }
};
StoreMaker.prototype.controlCurve = function(){
  this.curveTotalCookies = 0;
  for (var i = 0; i < curve.length; i++){
    this.curveWorkersPerHour[i] = Math.ceil(this.workersPerHour[i]*curve[i]);
    this.curveCookiesPerHour[i] = Math.ceil(this.cookiesPerHour[i]*curve[i]);
    this.curveTotalCookies += this.curveCookiesPerHour[i];
  }
};
StoreMaker.prototype.staffing = function(tableTwo){
  var tableEl = document.getElementById(tableTwo);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  createElement('th', this.name, trEl);
  if (tableTwo === 'workersPerHour'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){
      this.workersPerHour[i] = Math.ceil(this.cookiesPerHour[i]/20);
      if (this.workersPerHour[i] < 2){
        this.workersPerHour[i] = 2;
      }
      createElement('td', this.workersPerHour[i], trEl);
    }
  }
  if (tableTwo === 'curveWorkerOutput'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){  // eslint-disable-line 
      this.curveWorkersPerHour[i] = Math.ceil(this.curveCookiesPerHour[i]/20);
      if (this.curveWorkersPerHour[i] < 2){
        this.curveWorkersPerHour[i] = 2;
      }
      createElement('td', this.curveWorkersPerHour[i], trEl);
    }
  }
};
// this builds and sends the home page location sections to the DOM
StoreMaker.prototype.homePageLocs = function(){
  var sectionMain = document.getElementById('locations');
  var sectionInner = document.createElement('section');
  sectionMain.append(sectionInner);
  createElement('h3', this.name, sectionInner);
  createElement('address', this.storeInfo[0], sectionInner);
  createElement('p', this.storeInfo[1], sectionInner);
  var emailAdd = document.createElement('p');
  sectionInner.appendChild(emailAdd);
  var emailLink = document.createElement('a');
  emailLink.textContent = this.storeInfo[2];
  emailLink.href = this.storeInfo[3];
  emailAdd.appendChild(emailLink);
};

// make the original 5 store with the constructor
new StoreMaker('Seattle', 23, 65, 6.3, ['123 Whatever ST Seattle, WA 98105', '+1(206)358-1321', 'SeattleCookies@fish.net', 'mailto:#']);
new StoreMaker('Tokyo', 3, 24, 1.2, ['6 Chrome 7-1 Sendagaya, Shibuya City, Tokyo, 121-0072, Japan', '+81 3-6561-4593', 'TokyoCookies@fish.net', 'mailto:#']);
new StoreMaker('Dubai', 11, 38, 3.7, ['Dubai Silicon OasisCedre Villas, Dubai - United Arab Emirates', '+971 4 666 9834', 'DubaiCookies@fish.net', 'mailto:#']);
new StoreMaker('Paris', 20, 38, 2.3, ['75093, 103 Rue de Sevres, 75006 Paris, France', '+33 6 40 36 17 85', 'ParisCookies@fish.net', 'mailto:#']);
new StoreMaker('Lima', 2, 16, 4.6, ['Av. Petit Thouras 6657, Miraflores 15063, Peru', '+51 1 15670265', 'LimaCookies@fish.net', 'mailto:#']);

for (var n = 0; n < locations.length; n++){
  locations[n].cookiesSalesPerHour();
}

// ----------- write homepage locs
function homePage (){  // eslint-disable-line 
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
// function to calculate and send to the DOM the daily totals of all stores and the grand total for the day
function totalTotals (tableOne){
  var tableEl = document.getElementById(tableOne);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  createElement('th', 'Totals', trEl);
  var allTotals = [];
  var curveTotals = [];
  for (var i = 0; i < locations.length; i++){
    allTotals[i] = locations[i].cookiesPerHour;
    curveTotals[i] = locations[i].curveCookiesPerHour;
  }
  var hourlyTotal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var grandTotal = 0;
  if (tableOne === 'storeOutput'){
    for (var j = 0; j < allTotals[0].length; j++){
      for (var k = 0; k < allTotals.length; k++){
        hourlyTotal[j] += (allTotals[k][j]);
        grandTotal += (allTotals[k][j]);
      }
    }
  }
  if (tableOne === 'curveCookieOutput'){
    for (var j = 0; j < curveTotals[0].length; j++){  // eslint-disable-line 
      for (var k = 0; k < curveTotals.length; k++){   // eslint-disable-line 
        hourlyTotal[j] += (curveTotals[k][j]);
        grandTotal += (curveTotals[k][j]);
      }
    }
  }
  for (var l = 0; l < hourlyTotal.length; l++){
    createElement('td', hourlyTotal[l], trEl);
  }
  createElement('td', grandTotal, trEl);
}

function writeTimes(tableOne, tableTwo){
  var tableEl = document.getElementById(tableOne);
  var trEl = document.createElement('tr');
  tableEl.append(trEl);
  createElement('th', '', trEl);
  for (var i = 0; i < hours.length; i++){
    createElement('td', hours[i], trEl);
  }
  createElement('th', 'Daily Total', trEl);
  tableEl = document.getElementById(tableTwo);
  trEl = document.createElement('tr');
  tableEl.append(trEl);
  createElement('th', '', trEl);
  for ( i = 0; i < hours.length; i++){
    createElement('td', hours[i], trEl);
  }
}

//-------- form stuff- --------------
// get the element
var myForm = document.getElementById('new-store');

//define Event Handler, 'event' or 'e' for parameter name is conventional
function handleSubmit(event){
  event.preventDefault();
  // I'm pushing the values into an array so I can send any dynamic amount of information to my newStoreValidation function.
  var validateArray = [];
  var storeInfo = [];
  var name, minCust, maxCust, avgSale, address, phone, email;
  validateArray.push(name = event.target.name.value);
  validateArray.push(minCust = event.target.minCust.value);
  validateArray.push(maxCust = event.target.maxCust.value);
  validateArray.push(avgSale = event.target.avgSale.value);
  storeInfo.push(address = event.target.address.value); // eslint-disable-line 
  storeInfo.push(phone = event.target.phone.value);  // eslint-disable-line 
  storeInfo.push(email = event.target.email.value);  // eslint-disable-line 
  validateArray.push(storeInfo);
  if (newStoreValidation(validateArray) !== false && notANumber(name) !== false){
    new StoreMaker(name, minCust, maxCust, avgSale);
    locations[locations.length-1].cookiesSalesPerHour();
    document.getElementById('storeOutput').innerHTML = '';
    document.getElementById('curveCookieOutput').innerHTML = '';
    document.getElementById('workersPerHour').innerHTML = '';
    document.getElementById('curveWorkerOutput').innerHTML = '';
    writeToPage('storeOutput', 'workersPerHour');
    writeToPage('curveCookieOutput', 'curveWorkerOutput');
    document.getElementById('new-store').reset();
  } else {
    alert('Please double check your input and ensure all fields are filled out with the proper information.  please do not enter a number as a store name.');
  }
}
function notANumber(checker){
  if (isNaN(checker) === false ){
    console.log(checker);
    return false;
  }
}
// checks to make sure the user enters something
function newStoreValidation(checker){
  for ( var i = 0; i < checker.length; i++){
    if (checker[i] === ''){
      return false;
    }
  }
}

function createElement (childString, textContent, parentElement){
  var childElement = document.createElement(childString);
  childElement.textContent = textContent;
  parentElement.appendChild(childElement);
}
//add my event listener to the element
myForm.addEventListener('submit', handleSubmit);
