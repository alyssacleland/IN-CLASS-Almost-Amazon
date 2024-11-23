import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyBooks = () => {
  const domString = '<h1>No Books</h1>';
  renderToDOM('#store', domString);
};

const showBooks = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
  renderToDOM('#add-button', btnString); // add-button is dynamically added thru domBuilder (which is rendered in startapp), also cleared thru clearDom

  //   const searchBar = `<div class="input-group mb-3">
  //   <input type="text" class="form-control" placeholder="Search Books" aria-label="Search Books" aria-describedby="button-addon2">
  //   <button style="padding: 10px 30px; font-size: 20px"; class="tn btn-outline-secondary" type="button" id="search">⌕</button>
  // </div>`;
  //   renderToDOM('#form-container', searchBar);
  // lol nvm, the search bar is already there, in the navbar...

  let domString = '';
  array.forEach((item) => {
    domString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
            <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`;
  });
  renderToDOM('#store', domString);
};

const showAuthorBooks = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="card">
      <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
      <div class="card-body" style="height: 180px;">
        <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
          <hr>
          <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
          <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
      </div>
    </div>`;
  });
  return domString;
};

export { showBooks, emptyBooks, showAuthorBooks };
