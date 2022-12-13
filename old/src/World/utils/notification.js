let timer;

function displayNotif(category, message, interval) {
  clearInterval(timer);
  const div = document.querySelector('.notif');
  div.classList.add('active');
  if (category === 'error') {
    div.classList.add('error');
  } else if (category === 'info') {
    div.classList.add('info');
  } else {
    div.classList.add('hint');
  }
  div.textContent = message;
  timer = setInterval(() => {
    div.classList.remove('active');
    div.classList.remove('error');
    div.classList.remove('info');
    clearInterval(timer);
  }, interval);
}

export { displayNotif };
