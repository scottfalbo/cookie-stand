'use strict';

// random number generator.
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var locations = [];
var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
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
  //storeInfo[flag, address, phone, email, link]
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
  var thEl = document.createElement('th');
  thEl.textContent = this.name;
  trEl.append(thEl);
  if (tableOne === 'storeOutput'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){
      var tdEl = document.createElement('td');
      tdEl.textContent = this.cookiesPerHour[i];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookies;
    trEl.appendChild(tdEl);
  }
  if (tableOne === 'curveCookieOutput'){
    for (var i = 0; i < this.curveCookiesPerHour.length; i++){ // eslint-disable-line 
      tdEl = document.createElement('td');
      tdEl.textContent = this.curveCookiesPerHour[i];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = this.curveTotalCookies;
    trEl.appendChild(tdEl);
  }
};
StoreMaker.prototype.controlCurve = function(){
  var curve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4];
  this.curveTotalCookies = 0;
  for (var i = 0; i < curve.length; i++){
    this.curveWorkersPerHour[i] = Math.ceil(this.workersPerHour[i]*curve[i]);
    this.curveCookiesPerHour[i] = Math.ceil(this.cookiesPerHour[i]*curve[i]);
    this.curveTotalCookies += this.curveCookiesPerHour[i];
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
  if (tableTwo === 'workersPerHour'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){
      this.workersPerHour[i] = Math.ceil(this.cookiesPerHour[i]/20);
      if (this.workersPerHour[i] < 2){
        this.workersPerHour[i] = 2;
      }
      var tdEl = document.createElement('td');
      tdEl.textContent = this.workersPerHour[i];
      trEl.appendChild(tdEl);
    }
  }
  if (tableTwo === 'curveWorkerOutput'){
    for (var i = 0; i < this.cookiesPerHour.length; i++){  // eslint-disable-line 
      this.curveWorkersPerHour[i] = Math.ceil(this.curveCookiesPerHour[i]/20);
      if (this.curveWorkersPerHour[i] < 2){
        this.curveWorkersPerHour[i] = 2;
      }
      tdEl = document.createElement('td');
      tdEl.textContent = this.curveWorkersPerHour[i];
      trEl.appendChild(tdEl);
    }
  }
};
// this builds and sends the home page location sections to the DOM
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
  var t = document.createTextNode(this.storeInfo[1]);
  // address.textContent = this.storeInfo[1];
  sectionInner.appendChild(address);
  address.append(t);
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

// make the original 5 store with the constructor
new StoreMaker('Seattle', 23, 65, 6.3, ['images/flags/flag-seattle.jpg', '123 Whatever ST Seattle, WA 98105', '+1(206)358-1321', 'SeattleCookies@fish.net', 'mailto:#']);
new StoreMaker('Tokyo', 3, 24, 1.2, ['images/flags/flag-tokyo.jpg', '6 Chrome 7-1 Sendagaya, Shibuya City, Tokyo, 121-0072, Japan', '+81 3-6561-4593', 'TokyoCookies@fish.net', 'mailto:#']);
new StoreMaker('Dubai', 11, 38, 3.7, ['images/flags/flag-dubai.jpg', 'Dubai Silicon OasisCedre Villas, Dubai - United Arab Emirates', '+971 4 666 9834', 'DubaiCookies@fish.net', 'mailto:#']);
new StoreMaker('Paris', 20, 38, 2.3, ['images/flags/flag-paris.jpg', '75093, 103 Rue de Sevres, 75006 Paris, France', '+33 6 40 36 17 85', 'ParisCookies@fish.net', 'mailto:#']);
new StoreMaker('Lima', 2, 16, 4.6, ['images/flags/flag-lima.jpg', 'Av. Petit Thouras 6657, Miraflores 15063, Peru', '+51 1 15670265', 'LimaCookies@fish.net', 'mailto:#']);

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
  var thEl = document.createElement('th');
  thEl.textContent = 'Totals';
  trEl.appendChild(thEl);
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

//-------- form stuff- --------------
// get the element
var myForm = document.getElementById('new-store');

//define Event Handler, 'event' or 'e' for parameter name is conventional
function handleSubmit(event){
  event.preventDefault();
  // I'm pushing the values into an array so I can send any dynamic amount of information to my newStoreValidation function.
  var validateArray = [];
  var name, minCust, maxCust, avgSale;
  validateArray.push(name = event.target.name.value);
  validateArray.push(minCust = event.target.minCust.value);
  validateArray.push(maxCust = event.target.maxCust.value);
  validateArray.push(avgSale = event.target.avgSale.value);
  // console.log(`${name}, ${minCust}, ${maxCust}, ${avgSale}`);
  // figure out how to clear the form boxes on submit
  if (newStoreValidation(validateArray) !== false && notANumber(name) !== false){
    //if not duplicate
    checkDuplicateName(validateArray);
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
    alert('Please double check your input and ensure all fields are filled out with the proper information.');
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
function checkDuplicateName(checker){ // eslint-disable-line 
  for ( var i = 0; i < checker.length; i++){
    if (checker[0] === locations[i][0]){
      console.log('hello');
    }
  }
}

//add my event listener to the element
myForm.addEventListener('submit', handleSubmit);



