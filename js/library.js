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
  this.getLib();
  // this.getObject(this.libraryKey);
  // this._booksFromArray();
  // this._handleRemoveBooksByAuthor();
  // this.$sortShtuff = $("#sorter");
  this.$addBtn = $(".addBookModal");
  this.$addNotherBtn = $("#addMultipleBooksButton");
  this.$deleteBtn = $(".delete-button");
  this.$searchBtn = $("#searchBooksButton");
  this.$getAuthors = $("#getAuthorBtn");
  // this.$secondFormTemplate = $(".secondForm form").clone();
  this.$deleteAuthorsBtn = $("#author-delete");
  this.$randomBookBtn = $("#randomBookBtn")
  this._bindEvents();
};

Library.prototype._bindEvents = function() {
  this.$addBtn.on("click", $.proxy(this._handleAddOneBook, this));
  this.$addNotherBtn.on("click", $.proxy(this._handleAddNotherBook, this));
  this.$deleteBtn.on("click", $.proxy(this._handleRemoveByTitle, this));
  this.$searchBtn.on("click", $.proxy(this._handleSearch, this));
  this.$getAuthors.on("click", $.proxy(this._handleGetAuthors, this));
  this.$deleteAuthorsBtn.on("click", $.proxy(this._handleRemoveBooksByAuthor));
  this.$randomBookBtn.on("click", $.proxy(this._handleRandomBook, this));
  $("#author-delete").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
};

Library.prototype._booksFromArray = function(arg) {
  var deleteBtn = `<button class="delete-button"></button>`

  for (var i = 0; i < this.booksArray.length; i++) {

    _id = this.booksArray[i]._id;
    cover = this.booksArray[i].cover;
    title = this.booksArray[i].title;
    author = this.booksArray[i].author;
    numPages = this.booksArray[i].numPages;
    pubDate = this.booksArray[i].pubDate;
    $('.tableBody').append(`
    <tr><td><img src="${cover}"></td>
    <td>${title}</td>
    <td>${author}</td>
    <td>${numPages}</td>
    <td>${pubDate}</td>
    <td>${deleteBtn}</td></tr>`);
  }
};

Library.prototype._clearBookInputs = function() {
  $("#coverImg").val("");
  $("#titleInput").val("");
  $("#authorInput").val("");
  $("#pagesInput").val("");
  $("#dateInput").val("");
  $("#randomBookBody").val("");
  $("#searchInput").val("");
  }

Library.prototype._handleAddOneBook = function(args) {
  var singleBook = new Book(args);
  // var deleteBtn = `<button class="delete-button"></button>`

  singleBook.cover = $("#coverImg").val();
  singleBook.title = $("#titleInput").val();
  singleBook.author = $("#authorInput").val();
  singleBook.numPages = $("#pagesInput").val();
  singleBook.pubDate = $("#dateInput").val();
  // singleBook.deleteBtn = $(".delete-button");

  if (!singleBook.title || !singleBook.author) {
    alert("fields required!");
    return false;
  }

  if (this.addBook(singleBook)) {
    this.postLib(singleBook);
    // $('#tableBody').append("<tr><td><img src="+singleBook.cover+"></td><td>"+singleBook.title+"</td><td>"+singleBook.author+"</td><td>"+singleBook.numPages+"</td><td>"+singleBook.pubDate+"</td><td><img src="+deleteImg+" id="+deleteBtn+"></td></tr>");
  }

  this._clearBookInputs();
  return true;
};

Library.prototype._handleAddNotherBook = function() {
  var tempBooks = [];
  var counter = 0;
  for (var i = 0; i < 4; i++) {
    $(".modalFormOne").append(`
      <input id="${counter++}" type="url" name="file" placeholder="Cover Image">
      <input id="${counter++}" type="text" name="" placeholder="Title">
      <input id="${counter++}" type="text" name="" placeholder="Author">
      <input id="${counter++}" type="number" name="" placeholder="Number of Pages">
      <input id="${counter++}" type="date" name="" placeholder="Publication Date">
    `)
  }
};


Library.prototype._handleGetAuthors = function() {
  $("div.listOfAuthors").children().remove();
  this._displayAuthors(this.getAuthors());
};

Library.prototype._handleSearch = function(args) {
  event.preventDefault();
  this.searchLib(args);
};

Library.prototype._handleRandomBook = function(args) {
  $("")
}

Library.prototype._displayAuthors = function(authors) {
  for (var i in authors) {
    $("div.listOfAuthors").append(`
      <div class="card remove-author-card">
        <ul class="list-group list-group-flush author-list">
          <li class="remove-author-li">${authors[i]}<button class="delete-button author-delete"></button></li>
        </ul>
      </div>
    `);
  }
  this.$deleteAuthorsBtn = $(".author-delete");
   $(".author-delete").on("click", function(){
    var deletedAuthors = $(this).closest('li', this.$deleteAuthorsBtn).text();
    $("td:contains("+deletedAuthors+")").parent().remove()
    $(this).closest('li', this.$deleteAuthorsBtn).remove();
    gLib.removeBooksByAuthor(deletedAuthors);
  });
}


// Library.prototype._handleRemoveBooksByAuthor = function(author) {
//   var results = false;
//   for (var i = this.booksArray.length - 1; i >= 0; i--) {
//     if (this.booksArray[i].author === author) {
//       this.booksArray.splice(i, 1);
//       results = true;
//     }
//   }
//   this.setObject(this.libraryKey);
//   return results;
// };

Library.prototype._handleRemoveByTitle = function(e) {
  var row = $(e.currentTarget).parent().parent();
  this.removeBookByTitle(row.children()[1].innerText);
  row.remove();
  this.setObject(this.libraryKey);
};

//Book obj
var Book = function(args){
  this._id = args._id;
  this.cover = args.cover;
  this.title = args.title;
  this.author = args.author;
  this.numPages = args.numPages;
  this.pubDate = new Date(args.pubDate);
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
  // this.postLib(book);
  // this.booksArray.push(book);
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
   this.setObject(this.libraryKey);
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

Library.prototype.getLib = function() {
  _this = this;
  $.ajax({
  dataType: "json",
  type: "GET",
  url: "http://localhost:3000/library/"
}).done(function(response) {
  for (var i = 0; i < response.length; i++) {
    _this.booksArray.push(new Book(response[i]));
  }
  console.log(response);
}).fail(function(error) {
  console.log(error);
})
};

Library.prototype.postLib = function(book) {
  _this = this;
  $.ajax({
  dataType: "json",
  type: "POST",
  url: "http://localhost:3000/library/",
  data: book
}).done(function(response) {
  $('.tableBody').append("<tr><td>"+response.cover+"</td><td>"
  +response.title+"</td><td>"+response.author+"</td><td>"
  +response.numPages+"</td><td>"+response.pubDate+"</td></tr>");
  // _this.booksArray.push(new Book(book));
  console.log(response);
}).fail(function(error) {
  console.log(error);
})
};

// Library.prototype.setObject = function(libraryKey) {
//   localStorage.setItem(libraryKey, JSON.stringify(this.booksArray));
//   return libraryKey;
// };
//
// Library.prototype.getObject = function(instanceKey) {
//   // return this.booksArray = JSON.parse(localStorage.getItem(instanceKey));
//   this.booksArray = JSON.parse(localStorage.getItem(instanceKey));
//
//  if (this.booksArray === null) {
//      this.booksArray = new Array();
//  }
// };

$(document).ready(function() {
  window.gLib = new Library("allyLib");
  window.gLib.init();
  // gLib.getObject("allyLib");
});

  //Book Instances
  // window.gBook1 = new Book({cover: "css/IT.jpg", title: "IT", author: "Stephen King", numPages: 800, pubDate: "December 17, 1986"});
  // window.gBook2 = new Book({cover: "css/Shining.jpg", title: "The Shining", author: "Stephen King", numPages: 424, pubDate: "April 9, 1977"});
  // window.gBook3 = new Book({cover: "css/nineteenEightyFour.jpg", title: "1984", author: "George Orwell", numPages: 674, pubDate: "June 8, 1949"});
  // window.gBook4 = new Book({cover: "css/animalFarm.jpg", title: "Animal Farm", author: "George Orwell", numPages: 444, pubDate: "August 17, 1945"});
  // window.gBook5 = new Book({cover: "css/wonderland.jpg", title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", numPages: 400, pubDate: "November 26, 1865"});
  // window.gBook6 = new Book({cover: "css/looking-glass.jpg", title: "Through the Looking-Glass", author: "Lewis Carroll", numPages: 424, pubDate: "January 27, 1871"});
  // window.gBook7 = new Book({cover: "css/jabberwocky.jpg", title: "Jabberwocky", author: "Lewis Carroll", numPages: 390, pubDate: "March 10, 1871"});
  // window.gBook8 = new Book({cover: "css/catcherRye.jpg", title: "Catcher In The Rye", author: "JD Salinger", numPages: 200, pubDate: "December 25, 1987"});
  // window.gBook9 = new Book({cover: "css/frannyAndZooey.jpg", title: "Franny and Zooey", author: "JD Salinger", numPages: 320, pubDate: "June 22, 1953"});
  // window.gBook10 = new Book({cover: "css/teddy.jpg", title: "Teddy", author: "JD Salinger", numPages: 250, pubDate: "September 21, 1953"});
  //
  // window.bookLib = [gBook1, gBook2, gBook3, gBook4, gBook5, gBook6, gBook7, gBook8, gBook9, gBook10];
