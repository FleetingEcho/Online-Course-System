
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./Common/css/index.css"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "nprogress/nprogress.css"
import {persistor} from './Store'
import {PersistGate} from 'redux-persist/lib/integration/react';
import "bootstrap/dist/js/bootstrap"
import {Provider} from 'react-redux'
import store from './Store'
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
