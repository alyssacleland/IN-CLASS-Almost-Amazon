// note to self: i created this file

// import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { showAuthorBooks } from './books';

const viewAuthor = (data) => {
  document.querySelector('#view').innerHTML = '';
  document.querySelector('#store').innerHTML = '';

  const { author, books } = data; // destructuring the data to get the author and book arrays. this is shorthand for const author = data.author, and likewise for books.

  // add author details to dom string

  const domString = `
   <h5>Books</h5>
  <div class="text-white ms-5 details">
    <h5>${author.first_name} ${author.last_name} ${author.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
    Author Email: <a href="mailto:${author.email}">${author.email}</a>
    <div> <i class="fas fa-edit btn btn-info" id="update-author--${author.firebaseKey}"></i>
      <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${author.firebaseKey}"></i> </div>
    <hr>
    <h5>Books</h5>
    <div id="books-container"><!-- placeholder for author's books --></div>`;

  renderToDOM('#view', domString);

  // add books to #books-container
  const booksHtml = showAuthorBooks(books);
  document.querySelector('#books-container').innerHTML = booksHtml;
};
export default viewAuthor;
