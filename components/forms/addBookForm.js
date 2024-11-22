import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';
import selectAuthor from './selectAuthor';

// USING THIS FORM FOR BOTH CREATE AND UPDATE
// ternary used to determine the id attribute of the form. if firebase key exists, the id of the form will include update-book-- followed by the value of the firebase key. if firebaseKey is not defined or falsy, the id will simply be 'submit-book'. former case is for update, latter is for add. because you pass an object in, and the object we pass will have a firebase key only for update, i think (step 4).
const addBookForm = (user, obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-book--${obj.firebaseKey}` : 'submit-book'}" class="mb-4">
      <div class="form-group">
        <label for="title">Book Title</label>
        <input type="text" class="form-control" id="title" aria-describedby="bookTitle" placeholder="Enter Book Title" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" placeholder="Book Description" id="description" style="height: 100px">${obj.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="url" class="form-control" id="image" placeholder="Image URL" value="${obj.image || ''}" required>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="text" class="form-control" id="price" placeholder="Book Price" value="${obj.price || ''}" required>
      </div>
      <div class="form-group" id="select-author">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="sale" ${obj.sale ? 'checked' : ''}>
        <label class="form-check-label" for="sale">On Sale?</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit Book
      </button>
    </form>`;

  renderToDOM('#form-container', domString);
  selectAuthor(`${obj.author_id || ''}`, user.uid);
};

export default addBookForm;
