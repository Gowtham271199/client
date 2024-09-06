import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new React 18 import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Use React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
