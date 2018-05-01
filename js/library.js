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
  // this._handleRemoveBooksByAuthor();
  // this.$sortShtuff = $("#sorter");
  this.$addBtn = $("#myModal");
  this.$addNotherBtn = $("#addNotherBook");
  this.$deleteBtn = $("#delete-by-title-btn");
  this.$searchBtn = $("button.searchLibrary");
  this.$getAuthors = $("#getAuthorBtn");
  // this.$deleteAuthorsBtn = $("#author-delete");
  this._bindEvents();

};

Library.prototype._bindEvents = function() {
  this.$addBtn.on("click", $.proxy(this._handleAddOneBook, this));
  this.$addNotherBtn.on("click", $.proxy(this._handleAddNotherBook));
  this.$deleteBtn.on("click", $.proxy(this._handleRemove, this));
  this.$searchBtn.on("click", $.proxy(this._handleSearch, this));
  this.$getAuthors.on("click", $.proxy(this._handleGetAuthors, this));
  // this.$removeByAuthor.on("click", $.proxy(this._handleRemoveBooksByAuthor))
    $("#author-delete").on("click", $.proxy(this._handleRemoveBooksByAuthor, this))
};

Library.prototype._booksFromArray = function() {
  var deleteBtn = `<button id="delete-by-title-btn" class="delete-button"></button>`

  for (var i = 0; i < this.booksArray.length; i++) {
    cover = this.booksArray[i].cover;
    title = this.booksArray[i].title;
    author = this.booksArray[i].author;
    numberOfPages = this.booksArray[i].numberOfPages;
    date = this.booksArray[i].publishDate;
    $('#tableBody').append(`<tr><td><img src="${cover}"></td><td>${title}</td><td>${author}</td><td>${numberOfPages}</td><td>${date}</td><td>${deleteBtn}</td></tr>`);
  }
};

Library.prototype._clearBookInputs = function() {
  $("#coverImg").val("");
  $("#titleInput").val("");
  $("#authorInput").val("");
  $("#pagesInput").val("");
  $("#dateInput").val("");
  }

Library.prototype._handleAddOneBook = function(args) {
  var singleBook = new Book(args);

  singleBook.deleteBtn = $(".delete-button");
  singleBook.cover = $("#coverImg").val();
  singleBook.title = $("#titleInput").val();
  singleBook.author = $("#authorInput").val();
  singleBook.numberOfPages = $("#pagesInput").val();
  singleBook.publishDate = $("#dateInput").val();

  if (!singleBook.title || !singleBook.author) {
    return alert("Fields required!");
  }

  if (this.addBook(singleBook)) {
    this._booksFromArray(singleBook);

    // $('#tableBody').append("<tr><td><img src="+singleBook.cover+"></td><td>"+singleBook.title+"</td><td>"+singleBook.author+"</td><td>"+singleBook.numberOfPages+"</td><td>"+singleBook.publishDate+"</td><td><img src="+deleteImg+" id="+deleteBtn+"></td></tr>");
    this.setObject(this.libraryKey);
    this._clearBookInputs();
    return true;
  }
};

// Library.prototype._handleAddNotherBook = function() {
//   for (var i = 0; i < 4; i++) {
//     }


Library.prototype._handleGetAuthors = function() {
  this._displayAuthors(this.getAuthors());
  console.log()
}
Library.prototype._handleSearch = function() {

  return false;
};

Library.prototype._displayAuthors = function(authors) {
  for (var i in authors) {
    $("div#listOfAuthors").append(`
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li>${authors[i]}</li><button id="author-delete" class="delete-button"></button>
        </ul>
      </div>
    `);

  }
}


Library.prototype._handleRemoveBooksByAuthor = function() {
    // var deletedAuthors = $(this).prev().text();
    console.log(this)
  $("#author-delete").on("click", function(){
    // console.log($(this).prev().text());
    this.removeBooksByAuthor($(this).prev().text());
    $(this).prev().text().remove();
    this.setObject(this.libraryKey);
  });

}

Library.prototype._handleRemove = function(e) {
  var row = $(e.currentTarget).parent().parent();
  this.removeBookByTitle(row.children()[1].innerText);
  row.remove();
  this.setObject(this.libraryKey);
}

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
