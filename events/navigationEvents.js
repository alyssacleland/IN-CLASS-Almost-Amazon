import { getBooks, booksOnSale, bookSearch } from '../api/bookData';
import { signOut } from '../utils/auth';
import { showBooks, emptyBooks } from '../pages/books';
import { favoritedAuthors, getAuthors } from '../api/authorData';
import { showAuthors, emptyAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => { // updated to accept user, specifically for all books and sale books below too (where i pass user.uid)
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks); // update to accept user.uid in booksOnSale()
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn(getBooks(user.uid).then(showBooks)); // updated to accept user.uid in getbooks()
    console.warn('clicked all books');
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid)
      .then((authors) => {
        if (authors.length === 0) {
          emptyAuthors();
        } else {
          showAuthors(authors);
        }
      });
    console.warn('CLICKED AUTHORS');
  });

  // (a added) FAVORITED AUTHORS
  document.querySelector('#favorited-authors').addEventListener('click', () => {
    favoritedAuthors(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => { // The keyup event is fired when a key is released.
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) { // Keycode 13 means the Enter key.
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      bookSearch(user.uid, searchValue).then((result) => {
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
        if (result.length === 0) {
          emptyBooks();
          // OTHERWISE SHOW THE STORE
        } else {
          showBooks(result);
        }
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
