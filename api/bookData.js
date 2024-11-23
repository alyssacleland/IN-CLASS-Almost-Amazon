import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

// TODO: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, { // updated to be user specific
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]); // update getBooks fx to handle a null value from the API when there are no books or authors in the database
      }
    })
    .catch(reject);
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// TODO: CREATE BOOK
const createBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, { // update to order by uid
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      // Previously, you fetched all books and then filtered them for "on sale" status, but now you fetch the user's books by uid and then filter them in JavaScript to keep only those with sale: true. how? ...
      // Object.values(data): This method takes the data object (which is the books retrieved from the database) and extracts all of its values. Since Firebase stores data in an object with each key being a unique book ID, Object.values(data) will return an array of book objects.
      // .filter((item) => item.sale): This .filter() method goes through the array of books and returns only the books where the sale property is true.
      resolve(onSale);
    })
    .catch(reject);
});

// TODO: STRETCH...SEARCH BOOKS
const bookSearch = (uid, searchValue) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, { // update to order by uid
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const searchBooks = Object.values(data).filter((item) => item.title.toLowerCase().includes(searchValue));
      // you fetch the user's books by uid and then filter them in JavaScript to keep only those that you search for. how? ...
      // Object.values(data): This method takes the data object (which is the books retrieved from the database) and extracts all of its values. Since Firebase stores data in an object with each key being a unique book ID, Object.values(data) will return an array of book objects.
      // .filter((item) => XXX : This .filter() method goes through the array of books and returns only the books where XXX is true.
      resolve(searchBooks);
    })
    .catch(reject);
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  bookSearch
};
