var SearchMeetup = function() {};

//Constructor
var Location = function(args, instanceKey) {
  this.country = args.country;
  this.state = args.state;
  this.page = args.page;
  this.keyInstance = instanceKey;
}

//Search Function, getting values from inputs
SearchMeetup.prototype.searchLoc = function(args) {
  var search = new Location("meetupResults", args);
    search.country = $(".countryInput").val();
    search.state = $(".stateInput").val();
    search.page = $(".pageInput").val();

    //
    this.getLocation(search.country, search.state, search.page);
}

//Clear input fields after hitting submit button
SearchMeetup.prototype.clearInputs = function() {
  $(".countryInput").val("");
  $(".stateInput").val("");
  $(".pageInput").val("");
}

//Initialize
SearchMeetup.prototype.init = function() {
  this.$submitButton = $("#submitButton");
  this._bindEvents();
}

//Bind events function
SearchMeetup.prototype._bindEvents = function(){
  this.$submitButton.on("click", $.proxy(this.searchLoc, this));
}

//Ajax request
SearchMeetup.prototype.getLocation = function(country, state, page){
  _this = this;
  $.ajax({
    dataType: "jsonp",
    type: "GET",
    url: "https://api.meetup.com/2/cities",
    data: {
      key: "6b67617c43351a6373281e3e434447",
      country: country,
      state: state,
      page: page
    }
  }).done(function(response) {
    console.log(response);
    _this.printResults(response);
  }).fail(function(error) {
    console.log(error);
  })
}

//Function to display results to my table
SearchMeetup.prototype.printResults = function(response) {
  localStorage.setItem("meetupResults", JSON.stringify(response.results));
  var results = response.results;
  $("#tableBody").empty();
  for (var i = 0; i < results.length; i++) {
    $("#tableBody").append(`
      <tr><td>${results[i].country}</td>
      <td>${results[i].state}</td>
      <td>${results[i].city}</td>
      <td>${results[i].zip}</td>
      <td>${results[i].ranking}</td>
      <td>${results[i].member_count}</td></tr>
      `);
  }
  this.clearInputs();
}

//Doc. ready
$(function() {
  window.gLoc = new SearchMeetup();
  window.gLoc.init();
})
