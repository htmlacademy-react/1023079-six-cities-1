import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const MIN_OFFERS = 5;
const MAX_OFFERS = 10;

const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

const offersCount: number = getRandomNumber(MIN_OFFERS, MAX_OFFERS);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {offersCount}
    />
  </React.StrictMode>,
);
