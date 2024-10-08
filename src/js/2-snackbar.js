import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[name=delay]');
const submitBtn = document.querySelector('button');
const form = document.querySelector('.form');

const iziSuccessOptions = {
  title: '✅',
  titleSize: '24px',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'lightgreen',
  position: 'topRight',
  timeout: 3000,
};

const iziRejectOptions = {
  title: '❌',
  titleSize: '24px',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'rgba(225, 0, 0, 0.3)',
  position: 'topRight',
  timeout: 3000,
};

form.addEventListener('submit', submitHandle);

function submitHandle(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;
  const delayTime = parseInt(delay.value, 10); // Преобразуем задержку в число
  const choice = state.value;

  createPromise(delayTime, choice)
    .then(value => {
      iziToast.show({
        ...iziSuccessOptions,
        message: `Fulfilled promise in ${delayTime}ms`,
      });
      console.log(value);
    })
    .catch(error => {
      iziToast.show({
        ...iziRejectOptions,
        message: `Rejected promise in ${delayTime}ms`,
      });
      console.log(error);
    });
  form.reset();
}

function createPromise(delayTime, choice) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (choice === 'fulfilled') {
        resolve(`Promise fulfilled after ${delayTime}ms`);
      } else {
        reject(`Promise rejected after ${delayTime}ms`);
      }
    }, delayTime);
  });
}
