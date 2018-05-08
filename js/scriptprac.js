class Location {
  constructor(args) {
    this.locTable = [];
    this.country = args.country;
    this.state = args.state;
    this.zip = args.zip;
  }
};

  // class Args {
  //   constructor() {
  //     // this.ranking = args.ranking;
  //     // this.memberCount = args.memberCount;
  //   }
  // };

init = () => {
  this.getLocations();
}

getLocations = () => {
  $("submitButton").on("click", $.proxy(this.getLocations, this));


  $.ajax({
    dataType: "jsonp",
    type: "GET",
    url: "https://api.meetup.com/2/cities",
    data: args
  }).done((response) => {
    console.log(response);
  }).fail((error) => {
    console.log(error);
  })
  //append tr's and td's here
};

$(function() {
  window.gLoc = new Location();
  window.gArg = new Args(arguments);
  init();
});
