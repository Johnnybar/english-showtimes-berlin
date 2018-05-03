import Logo  from './logo';
import App from './app'
import areaChoice from './areaChoice'
import AreaChoiceInApp from './areaChoiceInApp'
import Area from './area'
import OneCinema from './oneCinema'
import Welcome from './welcome';
import Contact from './contact';
import Search from './search';
import SavedForLater from './savedForLater'
import Sample from './sample'
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

let router;

const outerRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={areaChoice} />
  	</Route>
    </Router>
);

const mainRouter = (
    <Provider store = {store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="/areas/:area" component ={Area} />
        <Route path="/cinemas/:cinema" component ={OneCinema} />
        <Route path="/SavedForLater" component ={SavedForLater} />
        <Route path="/Contact" component ={Contact} />
        <Route path="/Search" component ={Search} />
        <Route path="/sample" component={Sample}/>


        <Redirect from ="*" to="/" />
        <IndexRoute component={AreaChoiceInApp} />
    </Route>
    </Router>
</Provider>
);

if (location.pathname == '/welcome/'){
    router = outerRouter;
} else{
    router = mainRouter;
}

ReactDOM.render(
    router,
    document.querySelector('main')
);
