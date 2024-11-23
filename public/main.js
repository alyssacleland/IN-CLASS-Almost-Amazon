import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';

import 'bootstrap'; // import bootstrap elements and js
// import 'bootstrap-icons/font/bootstrap-icons.css'; // import bootstrap icons (so my magnifying glass will work?). note: i had to install first using "npm install bootstrap-icons". or what showed up in problems "npm i -S bootstrap-icons" nvm this isn't working
import '../styles/main.scss';

const init = () => {
  ViewDirectorBasedOnUserAuthStatus();
};

init();
