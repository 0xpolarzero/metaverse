import { displayNotif } from '../utils/notification';

function initMenu() {
  document
    .querySelector('.settings-btn')
    .addEventListener('click', displaySettings);
}

function displaySettings(e) {
  e.stopPropagation();
  displayNotif('error', 'The settings are not available yet...', 2000);
}

export { initMenu };
