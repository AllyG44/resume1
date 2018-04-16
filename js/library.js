  //Libary construct
  var Library = function(instanceKey){
    this.booksArray = new Array();
    this.libraryKey = instanceKey;
  };

  //Lib Instance
  var gLib = new Library("gLib1");

  //Book obj
  var Book = function(args){
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
      if (this.booksArray.length) {
        return this.booksArray[Math.floor(Math.random() * this.booksArray.length)];
      } else {
          return null;
      }
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
    return this.booksArray = JSON.parse(localStorage.getItem(instanceKey));
  };
  //Book Instances
  var gBook1 = new Book({title: "IT", auth: "Stephen King", numPages: 800, pubDate: "December 17, 1986"});
  var gBook2 = new Book({title: "The Shining", auth: "Stephen King", numPages: 424, pubDate: "April 9, 1977"});
  var gBook3 = new Book({title: "1984", auth: "George Orwell", numPages: 674, pubDate: "June 8, 1949"});
  var gBook4 = new Book({title: "Animal Farm", auth: "George Orwell", numPages: 444, pubDate: "August 17, 1945"});
  var gBook5 = new Book({title: "Alice's Adventures in Wonderland", auth: "Lewis Carroll", numPages: 400, pubDate: "November 26, 1865"});
  var gBook6 = new Book({title: "Through the Looking-Glass", auth: "Lewis Carroll", numPages: 424, pubDate: "January 27, 1871"});
  var gBook7 = new Book({title: "Jabberwocky", auth: "Lewis Carroll", numPages: 390, pubDate: "March 10, 1871"});
  var gBook8 = new Book({title: "Catcher In The Rye", auth: "JD Salinger", numPages: 200, pubDate: "December 25, 1987"});
  var gBook9 = new Book({title: "Nine Stories", auth: "JD Salinger", numPages: 320, pubDate: "June 22, 1953"});
  var gBook10 = new Book({title: "Teddy", auth: "JD Salinger", numPages: 250, pubDate: "September 21, 1953"});

  var bookLib = [gBook1, gBook2, gBook3, gBook4, gBook5, gBook6, gBook7, gBook8, gBook9, gBook10];
