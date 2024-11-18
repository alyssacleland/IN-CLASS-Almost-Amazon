import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

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

export {
  getBookDetails,
  getAuthorDetails
};
