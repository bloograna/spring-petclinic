import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './state';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

const store = configureStore();

const render = Component =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
