import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';

// We want to ensure that all the events get access to the UID so when we are CRUDing, we have the UID available.

const startApp = (user) => {
  domBuilder(user); // BUILD THE DOM, // ADD USER SO THAT YOU CAN UPDATE CALLS
  domEvents(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(user); // ATTACH THE EVENT LISTENERS TO THE NAVBAR. also passed user here because i need to update getbooks navigation events to have user.uid pass into getbooks there. so it's not just showing up on startapp

  // TODO: Put all books on the DOM on App load
  console.warn(getBooks(user.uid).then((books) => showBooks(books)));
};

export default startApp;
