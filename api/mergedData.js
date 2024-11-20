import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

// for merged promises
// We will use both of these calls (get single author and get single book) to get the data and then manipulate it before sending it to the UI

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

// GET AUTHOR DETAILS
// get data for viewBook (viewBook will use this) which is in pages
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE AUTHOR
  getSingleAuthor(firebaseKey)
    .then((authorObject) => { // returns single author object
      getAuthorBooks(firebaseKey) // returns an array of books for that author
        .then((booksArray) => {
          resolve({ author: authorObject, books: booksArray });
        })
        .catch(reject); // handle error for fetching books
    })
    .catch(reject); // handle error for fetchign author
});

// clean up (05)
// When we delete an author, first, we need to delete the book(s) associated with the author and then delete the author.
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey)); // create an array of promises to get all books
    // authorBooksArray is the array of books associated with the author, retrieved by getAuthorBooks(firebaseKey).
    // The .map() function iterates over authorBooksArray and creates an array of promises by calling deleteBook(book.firebaseKey) for each book.
    Promise.all(deleteBookPromises).then(() => { // pass the array of promises (deleteBookPromises) into promises.all()
      // Ensures all the promises in the array resolve (i.e., all books are deleted) before proceeding to the next step.
      deleteSingleAuthor(firebaseKey).then(resolve); // delete the author after all the book deletions are complete
    });
  }).catch(reject);
});
// next step: call this in dom events

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorBooksRelationship
};
