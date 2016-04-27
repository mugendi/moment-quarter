# moment-quarter
Get Fiscal Quarters for any countries and calculate custom quarters.

## WHY?
This module was written for an analytics platform that requires to have data organized in financial quarters. While working on this project I realized the need to write a module that will work out of the box for any country. After hours of searching the internet, I have compiled this module that will accurately calculate any fiscal quarters for almost any country on earth.

Enjoy :-)

## Ahem!
You will note this line below ```var moment = require('moment-quarter');``` if you wonder what's happening, it's because this module requires moment & exports moment so you won't need to include moment in your project!

I figured that this was an easy way to use moment. If you have moment already installed, no worries, NPM will figure that out and Node will happily use your installed moment module.

### Let's see some code...
First, install module with NPM 
```npm install --save moment-quarter```



```javascript 

//initialize
//Because this module already requires and exports moment, there's no need to install or require moment seperately
var moment = require('moment-quarter');

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

```

For more on numeric/custom quarters, read https://npmjs.org/package/moment-fquarter

This module borrows a lot from the awesome works of @robgallen. Robert, Ahsante (Swahili: Thank you)
