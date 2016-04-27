
var fiscal_years = require('./data/fiscal-years.json');
var moment = require('moment');
var cc = require("country-code");

var defaultLocale = 'KE'; //kenya
var defaultStartMonth = numeric_month('April'); //april


//This is where all the magic happens
(function () {

	function onload(moment) {
		moment.fn.fquarter = function (locale_or_start) {

			locale_or_start = locale_or_start || defaultStartMonth;

			//if numeric
			if(/^[0-9]+$/.test(locale_or_start)){
				var startMonth = parseInt(locale_or_start);
			}
			//if locale or country name given
			else{
				var startMonth = defaultStartMonth;
				var country = locale_or_start.trim().toUpperCase();

				// console.log(country);
				//if country given by ISO CODE, look it up
				if(country.length == 3 ){
					country = cc.countries[country].alpha2 || defaultLocale;
				}
				else if(country.length >= 3){
					//use title case
					country = cc.find( { name:  titleCase(country) } ).alpha2 || defaultLocale;
				}

				// console.log(country);

				//get fiscal year...
				var startMonth = (fiscal_years[country]) ? fiscal_years[country].start : defaultStartMonth;
				// get numeric start month and always default to Apr
				startMonth = numeric_month(startMonth) || defaultStartMonth;

			}


			var thisDate = this.clone();
			var initial = thisDate.local()._quarter || "Q";
			var result = {}, adjustedDate, nextYear = null;
			var originalDate = this.clone();

			if (startMonth > 1) {
				adjustedDate = thisDate.subtract(startMonth - 1, "months");
				nextYear = adjustedDate.clone().add(1, "years");
			} else {
				adjustedDate = thisDate;
			}
			if (startMonth < 0) {
				adjustedDate = thisDate.subtract(12 + startMonth, "month").add(1, "year");
				nextYear = adjustedDate.clone().add(1, "year");
			} else {
				adjustedDate = thisDate;
			}

			result.quarter = Math.ceil((adjustedDate.month() + 1.0) / 3.0);
			result.year = adjustedDate.year();
			result.nextYear = (nextYear) ? nextYear.year() : nextYear;
			result.start = originalDate.set("date", 1).subtract((originalDate.month()+12)%3, "months").format("YYYY-MM-DD");
			result.end =   originalDate.set("date", 1).subtract((originalDate.month()+12)%3, "months").add(3, "months").subtract(1, "day").format("YYYY-MM-DD");

			result.toString = function () {
				var str = initial + result.quarter + " " + result.year;
				return (nextYear) ? str + "/" + nextYear.format("YY") : str;
			};

			return result;
		};

		return moment;
	}

	if (typeof define === "function" && define.amd) {
		define("moment-fquarter", ["moment"], onload);
	} else if (typeof module !== "undefined") {
		module.exports = onload(require("moment"));
	} else if (typeof window !== "undefined" && window.moment) {
		onload(window.moment);
	}

}).apply(this);

/**
 * Convert three-letter month name to numeric month value
 * @param  {string} month  month value. Defaults to April
 * @return {integer}       numeric month value
 */
function numeric_month(month){
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	return months.indexOf(month)+1 || numeric_month('April');
}

/**
 * Convert text to titleCase
 * @param  {string} str string to convert
 * @return {string}
 */
function titleCase(str) {
  var newstr = str.split(" ");
  for(i=0;i<newstr.length;i++){
    var copy = newstr[i].substring(1).toLowerCase();
    newstr[i] = newstr[i][0].toUpperCase() + copy;
  }
   newstr = newstr.join(" ");
   return newstr;
}

//locale could be country name or ISO code
module.extends = function quarter(locale){
	return moment;
}
