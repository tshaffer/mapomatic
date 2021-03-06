/**
 * Created by tedshaffer on 11/5/16.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers';
import { Route } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
    , document.getElementById('content'));
