// note to self: i created this file

import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
// import { showBooks } from './books';

const viewAuthor = (data) => {
  clearDom();

  const { author, books } = data; // destructuring the data to get the author and book arrays. this is shorthand for const author = data.author, and likewise for books.

  // add author details to dom string
  let domString = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
     <p class="card-text bold">${author.favorite ? '<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i>Favorited</span>' : ''}</p>
          <hr>
      <h5 class="card-title">${author.first_name} ${author.last_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${author.email}</h6>
      <hr>
      <i class="fas fa-edit btn btn-info" id="update-author--${author.firebaseKey}"></i>
      <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${author.firebaseKey}"></i>
      <h6>Books:</h6>
      <ul>`;

  // Loop through the books array and append each book's title to the list
  books.forEach((book) => {
    domString += `
      <li>${book.title}</li>
    `;
  });

  // Close the unordered list and card body
  domString += `
      </ul>
    </div>
  </div>`;

  renderToDOM('#view', domString);
};

export default viewAuthor;
