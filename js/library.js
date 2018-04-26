(function() {
  var libInstance;

  window.Library = function(instanceKey) {
    if (libInstance) {
      return libInstance;
    }
    libInstance = this;
    this.booksArray = [];
    this.libraryKey = instanceKey;
  };
})();

Library.prototype.init = function () {
  this.$sortShtuff = $("#sorter");
  this.$addBtn = $("#addBookModal");
  this.$removeBtn = $("button.remove-book");
  this.$searchBtn = $("button.searchLibrary");
  this._bindEvents();

};

Library.prototype._bindEvents = function() {
  this.$addBtn.on("click", $.proxy(this._handleAddOneBook, this));
  this.$removeBtn.on("click", $.proxy(this._handleRemove, this));
  this.$searchBtn.on("click", $.proxy(this._handleSearch, this));
};

Library.prototype._myTable = function(args){

};
// var newRow = tableBody.insertRow();
// var coverCell = newRow.insertCell();
//  coverCell.innerHTML = "<img src=" + cover + ">";
//
//
// var tableBody = document.querySelector("#tableBody");
//
//
// var newRow = tableBody.insertRow();
// var titleCell  = newRow.insertCell();
// titleCell.innerHTML = title;
//
// var authorCell   = newRow.insertCell();
// authorCell.innerHTML = auth;
//
// var numPagesCell   = newRow.insertCell();
// numPagesCell.innerHTML = numPages;
//
// var dateCell   = newRow.insertCell();
// dateCell.innerHTML = pubDate;
  // debugger
  // $("#myTable").DataTable({
//     data: [
//     new Book(args)
// ],
// columns: [
//     { title: 'title' },
//     { title: 'author' },
//     { title: 'numberOfPages' },
//     { title: 'publishDate' }
// ]
  // });

Library.prototype._buildTable = function(args) {

};
//   addLineToHTMLTable("Michel", "Buffa");
//   addLineToHTMLTable("Marie-Claire", "Forgue");
//   addLineToHTMLTable("Tim", "Berners-Lee");
//
//   var tableBody = document.querySelector("#tableBody");
//
//   var newRow = tableBody.insertRow();
//
//   var coverCell = newRow.insertCell();
//   coverCell.innerHTML = "<img src=" + cover + ">";
//
//   var titleCell = newRow.insertCell();
//   titleCell.innerHTML = title;
//
//   var authorCell = newRow.insertCell();
//   authorCell.innerHTML = auth;
//
//   var numberOfPagesCell = newRow.insertCell();
//   numberOfPagesCell.innerHTML = numPages;
//
//   var publishDateCell = newRow.insertCell();
//   publishDateCell.innerHTML = pubDate;
//
//   var trashcanCell = newRow.insertCell();
//   trashcanCell.innerHTML = "<button class='btn btn-info deleteBook'>X</button>";

Library.prototype._handleAddOneBook = function() {
  var cover = $("#coverImg").val();
  var title = $("#titleInput").val();
  var author = $("#authorInput").val();
  var pages = $("#pagesInput").val();
  var dater = $("#dateInput").val();

  var addBook = new Book(cover, title, author, pages, dater);
  this.addBook(addBook);

  $("#tableBody").append("<tr class='newTableRow' accept='image'></tr>");
  $(".newTableRow").append("<td><img src="+cover+"></td>");
  $(".newTableRow").append("<td>"+title+"</td>");
  $(".newTableRow").append("<td>"+author+"</td>");
  $(".newTableRow").append("<td>"+pages+"</td>");
  $(".newTableRow").append("<td>"+dater+"</td>");

  // $('#tableBody').append("<tr><td><img src="+cover+"></td><td>"+title+"</td><td>"+author+"</td><td>"+pages+"</td><td>"+dater+"</td></tr>")
};

Library.prototype._handleSearch = function() {

};

  //Book obj
  var Book = function(args){
    this.cover = args.cover;
    this.title = args.title;
    this.author = args.auth;
    this.numberOfPages = args.numPages;
    this.publishDate = new Date(args.pubDate);
  };

  Library.prototype.addBook = function(book) {
  for (var i = 0; i < book.length; i++) {
    if (Array.isArray(book)) {
      return false;
    }
  }
    for(var i = 0; i < this.booksArray.length; i++) {
      if (this.booksArray[i].title == book.title) {
        return false;
      }
    }
    this.booksArray.push(book);
    // this._myTable(book);
    return true;
  };

  Library.prototype.removeBookByTitle = function(title) {
    for (var i = 0; i < this.booksArray.length; i++) {
      if (this.booksArray[i].title === title) {
        this.booksArray.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  Library.prototype.removeBooksByAuthor = function(auth) {
    var results = false;
    for (var i = this.booksArray.length - 1; i >= 0; i--) {
      if (this.booksArray[i].author === auth) {
        this.booksArray.splice(i, 1);
        results = true;
      }
    }
    return results;
  };

  Library.prototype.getRandomBook = function() {
    return this.booksArray.length ? this.booksArray[Math.floor(Math.random() * this.booksArray.length)] : null;
  };

  Library.prototype.getBookByTitle = function(title) {
    var tempArray = [];
    var pattern = new RegExp(title, "i");
    for (var i = 0; i < this.booksArray.length; i++) {
      if (pattern.test(this.booksArray[i].title)) {
      tempArray.push(this.booksArray[i]);
      }
    }
    return tempArray;
  };

  Library.prototype.getBooksByAuthor = function(auth) {
    var tempArray = [];
    var pattern = new RegExp(auth, "i");
    for (var i = 0; i < this.booksArray.length; i++) {
      if (pattern.test(this.booksArray[i].author)) {
        tempArray.push(this.booksArray[i]);
      }
    }
    return tempArray;
  };

  Library.prototype.addBooks = function(books) {
    for (var i = 0; i < books.length; i++) {
      if (!Array.isArray(books)) {
        return false;
      }
    }
    var count = 0;
    for(var i = 0; i < books.length; i++) {
      if (this.addBook(books[i])) {
        count++;
      }
    }
    return count;
  };

  Library.prototype.getAuthors = function() {
    var authorGet = [];
    for (var i = 0; i < this.booksArray.length; i++) {
      if (authorGet.indexOf(this.booksArray[i].author) === - 1) {
        authorGet.push(this.booksArray[i].author);
      }
    }
    return authorGet;
  };

  Library.prototype.getRandomAuthorName = function() {
    if (this.booksArray.length) {
      return this.booksArray[Math.floor(Math.random() * this.booksArray.length)].author;
    } else {
        return null;
    }
  };

  Library.prototype.searchLib = function(string) {
    var searchArr = [];
    searchArr.push(this.getBookByTitle(string));
    searchArr.push(this.getBooksByAuthor(string));
    return searchArr;
  };

  Library.prototype.setObject = function(instanceKey) {
    localStorage.setItem(instanceKey, JSON.stringify(this.booksArray));
    return instanceKey;
  };

  Library.prototype.getObject = function(instanceKey) {
    // return this.booksArray = JSON.parse(localStorage.getItem(instanceKey));
    this.booksArray = JSON.parse(localStorage.getItem(this.instanceKey));

   if (this.booksArray === null) {
       this.booksArray = new Array();
   }
  };

  $(document).ready(function() {
    window.gLib = new Library("allyLib");
    window.gLib.init();
  });

  //Book Instances
  window.gBook1 = new Book({title: "IT", auth: "Stephen King", numPages: 800, pubDate: "December 17, 1986"});
  window.gBook2 = new Book({title: "The Shining", auth: "Stephen King", numPages: 424, pubDate: "April 9, 1977"});
  window.gBook3 = new Book({title: "1984", auth: "George Orwell", numPages: 674, pubDate: "June 8, 1949"});
  window.gBook4 = new Book({title: "Animal Farm", auth: "George Orwell", numPages: 444, pubDate: "August 17, 1945"});
  window.gBook5 = new Book({title: "Alice's Adventures in Wonderland", auth: "Lewis Carroll", numPages: 400, pubDate: "November 26, 1865"});
  window.gBook6 = new Book({title: "Through the Looking-Glass", auth: "Lewis Carroll", numPages: 424, pubDate: "January 27, 1871"});
  window.gBook7 = new Book({title: "Jabberwocky", auth: "Lewis Carroll", numPages: 390, pubDate: "March 10, 1871"});
  window.gBook8 = new Book({title: "Catcher In The Rye", auth: "JD Salinger", numPages: 200, pubDate: "December 25, 1987"});
  window.gBook9 = new Book({title: "Franny and Zooey", auth: "JD Salinger", numPages: 320, pubDate: "June 22, 1953"});
  window.gBook10 = new Book({title: "Teddy", auth: "JD Salinger", numPages: 250, pubDate: "September 21, 1953"});

  window.bookLib = [gBook1, gBook2, gBook3, gBook4, gBook5, gBook6, gBook7, gBook8, gBook9, gBook10];
