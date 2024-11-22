import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, getSingleAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import viewBook from '../pages/viewBook';
import viewAuthor from '../pages/viewAuthor';

// import { emptyAuthors } from '../pages/authors';
// import { getAuthors } from '../api/authorData';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(user);
      console.warn('ADD BOOK');
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user, bookObj)); // i think bookObj... like, once the first part is resolved, the resulting data is what is passed into the next part (the .then), and we are just referring to it as bookObject here
      console.warn('CLICKED EDIT/UPDATE BOOK');
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS

    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook); // Once the getBookDetails Promise resolves, the .then() method is called. It takes the result of the getBookDetails function (the book data) and passes it as an argument to the viewBook function.

      console.warn('VIEW BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
      console.warn(getBooks());
    }

    // TODO: CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) { // see 'view-author-btn' as id in authors.js which is basically like authors on dom
      const [, firebaseKey] = e.target.id.split('--');

      getAuthorDetails(firebaseKey).then(viewAuthor);

      console.warn('VIEW AUTHOR', e.target.id);
      console.warn(e.target.id.split('--'));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => { // updated to delete authors books when author is deleted, with delete authorBooksRelationship fx (in merged data file)
          getAuthors(user.uid).then(showAuthors);
        });
        // console.warn(getAuthors());
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
      console.warn('ADD AUTHOR');
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    // On click of update button, grab the author firebaseKey
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
      console.warn('CLICKED UPDATE AUTHOR');
    }
  });
};

export default domEvents;
