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
  this.getObject(this.libraryKey);
  this._booksFromArray();
  // this.$sortShtuff = $("#sorter");
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
// authorCell.innerHTML = author;
//
// var numberOfPagesCell   = newRow.insertCell();
// numberOfPagesCell.innerHTML = numberOfPages;
//
// var dateCell   = newRow.insertCell();
// dateCell.innerHTML = publishDate;

// Library.prototype._buildTable = function(args) {
//
// };
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
//   authorCell.innerHTML = author;
//
//   var numberOfPagesCell = newRow.insertCell();
//   numberOfPagesCell.innerHTML = numberOfPages;
//
//   var publishDateCell = newRow.insertCell();
//   publishDateCell.innerHTML = publishDate;
//
//   var trashcanCell = newRow.insertCell();
//   trashcanCell.innerHTML = "<button class='btn btn-info deleteBook'>X</button>";

Library.prototype._booksFromArray = function() {
  var cover, title, author, numberOfPages, date;

  for (var i = 0; i < this.booksArray.length; i++) {
    cover = this.booksArray[i].cover;
    title = this.booksArray[i].title;
    author = this.booksArray[i].author;
    numberOfPages = this.booksArray[i].numberOfPages;
    date = this.booksArray[i].publishDate;
    $('#tableBody').append("<tr><td><img src="+cover+"></td><td>"+title+"</td><td>"+author+"</td><td>"+numberOfPages+"</td><td>"+date+"</td></tr>");
  }
};

Library.prototype._handleAddOneBook = function(args) {
  var singleBook = new Book(args);

  singleBook.cover = $("#coverImg").val();
  singleBook.title = $("#titleInput").val();
  singleBook.author = $("#authorInput").val();
  singleBook.numberOfPages = $("#pagesInput").val();
  singleBook.publishDate = $("#dateInput").val();

  if (!singleBook.title || !singleBook.author) {
    return alert("Fields required!");
  }

  if (this.addBook(singleBook)) {
    $('#tableBody').append("<tr><td><img src="+singleBook.cover+"></td><td>"+singleBook.title+"</td><td>"+singleBook.author+"</td><td>"+singleBook.numberOfPages+"</td><td>"+singleBook.publishDate+"</td></tr>");
    this.setObject(this.libraryKey);
    return true;
  }
};

Library.prototype._handleSearch = function() {

  return false;
};

  //Book obj
  var Book = function(args){
    this.cover = args.cover;
    this.title = args.title;
    this.author = args.author;
    this.numberOfPages = args.numberOfPages;
    this.publishDate = new Date(args.publishDate);
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

  Library.prototype.removeBooksByAuthor = function(author) {
    var results = false;
    for (var i = this.booksArray.length - 1; i >= 0; i--) {
      if (this.booksArray[i].author === author) {
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

  Library.prototype.getBooksByAuthor = function(author) {
    var tempArray = [];
    var pattern = new RegExp(author, "i");
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

  Library.prototype.setObject = function(libraryKey) {
    localStorage.setItem(libraryKey, JSON.stringify(this.booksArray));
    return libraryKey;
  };

  Library.prototype.getObject = function(instanceKey) {
    // return this.booksArray = JSON.parse(localStorage.getItem(instanceKey));
    this.booksArray = JSON.parse(localStorage.getItem(instanceKey));

   if (this.booksArray === null) {
       this.booksArray = new Array();
   }
  };

  $(document).ready(function() {
    window.gLib = new Library("allyLib");
    window.gLib.init();
  });

  //Book Instances
  window.gBook1 = new Book({cover: "css/IT.jpg", title: "IT", author: "Stephen King", numberOfPages: 800, publishDate: "December 17, 1986"});
  window.gBook2 = new Book({cover: "css/Shining.jpg", title: "The Shining", author: "Stephen King", numberOfPages: 424, publishDate: "April 9, 1977"});
  window.gBook3 = new Book({cover: "css/nineteenEightyFour.jpg", title: "1984", author: "George Orwell", numberOfPages: 674, publishDate: "June 8, 1949"});
  window.gBook4 = new Book({cover: "css/animalFarm.jpg", title: "Animal Farm", author: "George Orwell", numberOfPages: 444, publishDate: "August 17, 1945"});
  window.gBook5 = new Book({cover: "css/wonderland.jpg", title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", numberOfPages: 400, publishDate: "November 26, 1865"});
  window.gBook6 = new Book({cover: "css/looking-glass.jpg", title: "Through the Looking-Glass", author: "Lewis Carroll", numberOfPages: 424, publishDate: "January 27, 1871"});
  window.gBook7 = new Book({cover: "css/jabberwocky.jpg", title: "Jabberwocky", author: "Lewis Carroll", numberOfPages: 390, publishDate: "March 10, 1871"});
  window.gBook8 = new Book({cover: "css/catcherRye.jpg", title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "December 25, 1987"});
  window.gBook9 = new Book({cover: "css/frannyAndZooey.jpg", title: "Franny and Zooey", author: "JD Salinger", numberOfPages: 320, publishDate: "June 22, 1953"});
  window.gBook10 = new Book({cover: "css/teddy.jpg", title: "Teddy", author: "JD Salinger", numberOfPages: 250, publishDate: "September 21, 1953"});

  window.bookLib = [gBook1, gBook2, gBook3, gBook4, gBook5, gBook6, gBook7, gBook8, gBook9, gBook10];
