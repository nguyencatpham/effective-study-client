import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './app/store/createStore'
import AppContainer from './app/containers/AppContainer'
import createAxiosInterceptor from './app/store/AxiosInterceptor'
// import WOW from 'wow.js/dist/wow.js';
// import {Button} from 'react-bootstrap'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

//get data(userdata, pageinfo) from localstorage when refresh page
store.dispatch({ type: 'INIT' });

createAxiosInterceptor(store);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./app/routes/index').default(store);
  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error);
        renderError(error)
      }
    };

    // Setup hot module replacement
    module.hot.accept('./app/routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render();
