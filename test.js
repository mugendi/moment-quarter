var moment = require('./index');


//fiscal quarter for country (Kenya)
var Q = moment("2013-04-01").fquarter('ke');
var Q = moment("2013-04-01").fquarter('KEN');
var Q = moment("2013-04-01").fquarter('Kenya');

console.log(Q); // { quarter: 4,  year: 2012, nextYear: 2013, start: '2013-04-01', end: '2013-06-30'}

//You can return the quarter data as a string...
var Q = moment("2013-04-01").fquarter('KENYA').toString();

console.log(Q); //Q4 2012/13

//You can also use numeric values to denote custom quaters like this
var Q = moment("2013-09-01").fquarter(1).toString();

console.log(Q); //Q3 2013
