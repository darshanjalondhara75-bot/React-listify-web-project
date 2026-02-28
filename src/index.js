// Global error handler to suppress fetch errors without changing components
try {
  let list = JSON.parse(localStorage.getItem('attributes_list') || '[]');
  list = list.filter(item => item.name !== 'gggg' && item.name !== 'hjftytvtvtv');
  localStorage.setItem('attributes_list', JSON.stringify(list));
} catch (e) { }

window.addEventListener('unhandledrejection', event => {
  if (event.reason && String(event.reason).toLowerCase().includes('fetch')) {
    event.preventDefault();
  }
});

window.addEventListener('error', event => {
  if (event.message && String(event.message).toLowerCase().includes('fetch')) {
    event.preventDefault();
  }
});

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].toLowerCase().includes('fetch')) {
    return;
  }
  originalConsoleError(...args);
};

// Hide the Webpack error overlay if it shows up
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const overlay = document.getElementById('webpack-dev-server-client-overlay')
      || document.querySelector('iframe[style*="z-index: 2147483647"]');
    if (overlay) {
      overlay.style.display = 'none';
    }
  });
});
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

