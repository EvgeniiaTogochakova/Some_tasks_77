class Library {
  #books = [];

  constructor(listOfBooks) {
    try {
      const uniqueListOfBooks = [
        ...new Set(listOfBooks.map((book) => book.title)),
      ];
      if (uniqueListOfBooks.length !== listOfBooks.length) {
        throw new Error("Список книг содержит дубликаты!");
      }
      this.#books = listOfBooks;
    } catch (error) {
      console.error(`Ошибка ${error}`);
    }
  }

  get allBooks() {
    return this.#books;
  }

  hasBook(title) {
    return this.#books.some((book) => book.title === title);
  }

  addBook(title) {
    try {
      if (this.hasBook(title)) {
        throw new Error(`В библиотеке уже есть книга c названием "${title}"`);
      }
      const newBook = {
        title,
      };
      this.#books.push(newBook);
    } catch (error) {
      console.error(`Ошибка ${error}`);
    }
  }

  removeBook(title) {
    try {
      let index = this.#books.map((book) => book.title).indexOf(title);
      if (index === -1) {
        throw new Error(`В библиотеке нет книги с названием "${title}"`);
      }
      this.#books.splice(index, 1);
    } catch (error) {
      console.error(`Ошибка ${error}`);
    }
  }
}

const myBooks = [
  { title: "The Thorn Birds" },
  { title: "Gone With the Wind" },
  { title: "The Three Musketeers" },
];

const myLibrary = new Library(myBooks);
console.log(myLibrary.allBooks);
myLibrary.addBook("The Catcher in the Rye");
console.log(myLibrary.allBooks);
console.log(myLibrary.hasBook("The Thorn Birds"));
console.log(myLibrary.hasBook("Anna Karenina"));

myLibrary.addBook("The Three Musketeers");
console.log(myLibrary.allBooks);
myLibrary.removeBook("The Three Musketeers");
console.log(myLibrary.allBooks);
console.log(myLibrary.hasBook("The Three Musketeers"));
myLibrary.removeBook("Anna Karenina");
myLibrary.addBook("The Catcher in the Rye");
