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

//Initilization method
Library.prototype.init = function () {
  this.getLib();
  this.$addBtn = $(".addBookModal");
  this.$addNotherBtn = $("#addMultipleBooksButton");
  this.$deleteBtn = $(".delete-button");
  this.$searchBtn = $("#searchBooksButton");
  this.$getAuthors = $("#getAuthorBtn");
  this.$deleteAuthorsBtn = $("#author-delete");
  this.$randomBookBtn = $("#randomBookBtn");
  this._bindEvents();
};

//Bind events
Library.prototype._bindEvents = function() {
  this.$addBtn.on("click", $.proxy(this._handleAddOneBook, this));
  this.$addNotherBtn.on("click", $.proxy(this._handleAddNotherBook, this));
  this.$deleteBtn.on("click", $.proxy(this._handleRemoveByTitle, this));
  this.$searchBtn.on("click", $.proxy(this._handleSearch, this));
  this.$getAuthors.on("click", $.proxy(this._handleGetAuthors, this));
  this.$deleteAuthorsBtn.on("click", $.proxy(this._handleRemoveBooksByAuthor));
  this.$randomBookBtn.on("click", $.proxy(this._handleRandomBook, this));
  // can't store before modal appears...?
  $("#author-delete").on("click", $.proxy(this._handleRemoveBooksByAuthor, this));
};

//Display books on UI
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
    <td contenteditable>${title}</td>
    <td contenteditable>${author}</td>
    <td contenteditable>${numPages}</td>
    <td contenteditable>${pubDate}</td>
    <td>${deleteBtn}</td></tr>`);
  }
};

//Clears inputs in modal after adding a book
Library.prototype._clearBookInputs = function() {
  $("#coverImg").val("");
  $("#titleInput").val("");
  $("#authorInput").val("");
  $("#pagesInput").val("");
  $("#dateInput").val("");
  $("#randomBookBody").val("");
  $("#searchInput").val("");
  }

//UI button for adding a single book
Library.prototype._handleAddOneBook = function(args) {
  var singleBook = new Book(args);
  var deleteBtn = `<button class="delete-button"></button>`

  singleBook.cover = $("#coverImg").val();
  singleBook.title = $("#titleInput").val();
  singleBook.author = $("#authorInput").val();
  singleBook.numPages = $("#pagesInput").val();
  singleBook.pubDate = $("#dateInput").val();

  if (!singleBook.title || !singleBook.author) {
    alert("fields required!");
    return false;
  }

  if (this.addBook(singleBook)) {
    console.log(singleBook);
    this.postLib(singleBook);
    $('.tableBody').append(`
    <tr><td><img src="${singleBook.cover}"></td>
    <td>${singleBook.title}</td>
    <td>${singleBook.author}</td>
    <td>${singleBook.numPages}</td>
    <td>${singleBook.pubDate}</td>
    <td>${deleteBtn}</td></tr>`);
  }

  this._clearBookInputs();
  return true;
};

//UI button for adding multiple books -- Couldn't get it to work with Ajax..
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

//UI button for displaying all authors
Library.prototype._handleGetAuthors = function() {
  $("div.listOfAuthors").children().remove();
  this._displayAuthors(this.getAuthors());
};

//Area to append/display all authors
Library.prototype._displayAuthors = function(authors) {
  var _this = this;
  for (var i in authors) {
    $("div.listOfAuthors").append(`
      <div class="card remove-author-card">
        <ul class="list-group list-group-flush author-list">
          <li class="remove-author-li">${authors[i]}<button class="delete-button author-delete"></button></li>
        </ul>
      </div>
    `);
  }
}

Library.prototype._removeAuthorCatchAll = function (author) {
  this.$deleteAuthorsBtn = $(".author-delete");
   $(".author-delete").on("click", function(){
    var deletedAuthors = $(this).closest('li', this.$deleteAuthorsBtn).text();
    $("td:contains("+deletedAuthors+")").parent().remove()
    $(this).closest('li', this.$deleteAuthorsBtn).remove();
    gLib.removeBooksByAuthor(deletedAuthors);
    // _this.deleteLib(author);
  });
};

//X button that deletes books from my table
Library.prototype._handleRemoveByTitle = function(e) {
  var row = $(e.currentTarget).parent().parent();
  this.removeBookByTitle(row.children()[1].innerText);
  row.remove();
  this.deleteLib();
};

//Book obj/constructor
var Book = function(args){
  this._id = args._id;
  this.cover = args.cover;
  this.title = args.title;
  this.author = args.author;
  this.numPages = args.numPages;
  this.pubDate = new Date(args.pubDate);
};

//Here begins the console commands

//Add single book, was working with local storage
//Now doesn't really work in console, only being called by _handleAddOneBook function
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
  this.booksArray.push(book);
  return true;
};

//Removes book by title
Library.prototype.removeBookByTitle = function(title) {
  for (var i = 0; i < this.booksArray.length; i++) {
    if (this.booksArray[i].title === title) {
      this.booksArray.splice(i, 1);
      return true;
    }
  }
  return false;
};

//Removes all books by specified author
Library.prototype.removeBooksByAuthor = function(author) {
  var results = false;
  for (var i = this.booksArray.length - 1; i >= 0; i--) {
    if (this.booksArray[i].author === author) {
      this.booksArray.splice(i, 1);
      results = true;
    }
  }
  this._removeAuthorCatchAll(author)
  this.deleteLib(author);
  return results;
};

//Retrieves random book from my array
Library.prototype.getRandomBook = function() {
  return this.booksArray.length ? this.booksArray[Math.floor(Math.random() * this.booksArray.length)] : null;
};

//Retrieves book by title
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

//Retrieves all books by specified author
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

//Add multiple books
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

//Retrieves all authors available in array
Library.prototype.getAuthors = function() {
  var authorGet = [];
  for (var i = 0; i < this.booksArray.length; i++) {
    if (authorGet.indexOf(this.booksArray[i].author) === - 1) {
      authorGet.push(this.booksArray[i].author);
    }
  }
  return authorGet;
};

//Retrieves random author name
Library.prototype.getRandomAuthorName = function() {
  if (this.booksArray.length) {
    return this.booksArray[Math.floor(Math.random() * this.booksArray.length)].author;
  } else {
      return null;
  }
};

//Search function, can search by title or by author
Library.prototype.searchLib = function(string) {
  var searchArr = [];
  searchArr.push(this.getBookByTitle(string));
  searchArr.push(this.getBooksByAuthor(string));
  return searchArr;
};

//Ajax GET request
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
  console.log("response");
}).fail(function(error) {
  console.log("error");
})
};

//Ajax POST request
Library.prototype.postLib = function(book) {
  _this = this;
  $.ajax({
  dataType: "json",
  type: "POST",
  url: "http://localhost:3000/library/",
  data: book
}).done(function(response) {
  console.log("postLib success!");
}).fail(function(error) {
  console.log("error");
})
};

//Ajax delete function, removes books from DB
//Currently not working at all, but was giving me a 404 error when it at least gave me an error
Library.prototype.deleteLib = function(book) {
  _this = this;
  $.ajax({
  dataType: "json",
  type: "DELETE",
  url: "http://localhost:3000/library/",
  data: book
}).done(function(response) {
  console.log("Yay!");
}).fail(function(error) {
  console.log("FAIL...");
})
};

//PUT not working
Library.prototype.putLib = function(book) {
  _this = this;
  $.ajax({
  dataType: "json",
  type: "PUT",
  url: "http://localhost:3000/library/",
  data: book
}).done(function(response) {
  console.log("Success!");
}).fail(function(error) {
  console.log("FAIL...");
})
};

//Doc ready
$(document).ready(function() {
  window.gLib = new Library("allyLib");
  window.gLib.init();
});
