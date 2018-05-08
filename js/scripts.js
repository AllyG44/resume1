// var args = [];

var SearchMeetup = function() {};

//Location obj
var Location = function(args) {
  this.country = args.country;
  this.state = args.state;
  this.city = args.city;
  this.zip = args.zip;
  this.ranking = args.ranking;
  this.member_count = args.member_count;
}

SearchMeetup.prototype.searchLoc = function(args) {
  var search = new Location(args);
    search.country = $("#countryInput").val();
    search.state = $("#stateInput").val();
    search.city = $("#cityInput").val();
    search.zip = $("#zipInput").val();
    search.rankink = $("#rankingInput").val();
    search.member_count = $("#memberInput").val();
    this.getLocation(search.country, search.state, search.city, search.zip, search.ranking, search.member_count);
    console.log(search.country);
}


SearchMeetup.prototype.init = function() {
  this.$submitButton = $("#submitButton");
  this._bindEvents();
  // this.searchLoc();
  // this.getLocation();
}

SearchMeetup.prototype._bindEvents = function(){
  this.$submitButton.on("click", $.proxy(this.searchLoc, this));
  // this.$submitButton.on("click", $.proxy(this.searchLoc, this));
  // this.$submitButton.on("click", $.proxy(this.clearInputs, this));
}

SearchMeetup.prototype.getLocation = function(country, state, city, zip, ranking, member_count){
  // _this = this;
  $.ajax({
    dataType: "jsonp",
    type: "GET",
    url: "https://api.meetup.com/2/cities",
    data: {
      key: "6b67617c43351a6373281e3e434447",
      country: this.country,
      state: this.state,
      city: this.city,
      zip: this.zip,
      ranking: this.ranking,
      member_count: this.member_count
    }
  }).done(function(response) {
    console.log(response);
    // _this.searchLoc(response);
    // this.printResults(response);
  }).fail(function(error) {
    console.log(error);
  })
}

SearchMeetup.prototype.printResults = function(response) {
  var results = response.results;
  for (var i = 0; i < results.length; i++) {
    country = results[i].country;
    state = results[i].state;
    city = results[i].city;
    zip = results[i].zip;
    ranking = results[i].ranking;
    member_count = results[i].member_count;

    // console.log(results[i]);
    $("#tableBody").append(`
      <tr><td>${country}</td>
      <td>${state}</td>
      <td>${city}</td>
      <td>${zip}</td>
      <td>${ranking}</td>
      <td>${memberCount}</td></tr>
      `);
  }
}

// SearchMeetup.prototype.setObject = function(instanceKey) {
//   localStorage.setItem(instanceKey, JSON.stringify(this.getLocation));
//   return instanceKey;
// };
//
// SearchMeetup.prototype.getObject = function(instanceKey) {
//   this.getLocation = JSON.parse(localStorage.getItem(instanceKey));
//
//  if (this.getLocation === null) {
//      this.getLocation = new Array();
//  }
// };

$(function() {
  window.gLoc = new SearchMeetup();
  window.gLoc.init();
})
