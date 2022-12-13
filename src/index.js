import App from './App';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
