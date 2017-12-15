// import Welcome from './welcome';
// import Logo  from './logo';
// import Login from './login';
// import App from './app'
// import Register from './register';
// import Profile from './profile'
// import OtherUsers from './otherusers'
// import FriendButton from './friendbutton'
// import Friends from './friends'
// import Online from './online'
// import Chat from './chat'
// import About from './about'
// import socketConnections from './socket'
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';

let router;

const outerRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            {/* <Route path="/login" component={Login} /> */}
            <IndexRoute component={areaChoice} />
  	</Route>
    </Router>
);

const mainRouter = (
    <Provider store = {store}>
    <Router history={browserHistory}>
        {/* THIS IS THE MAIN PAGE */}
        <Route path="/" component={App}>
        {/* THIS IS WHERE YOU SEE THE CINEMAS IN THE AREA YOU CHOSE */}
        <Route path="/:area" component={Cinemas} />
        {/* THIS IS THE SPECIFIC CINEMA YOU CHOSE */}
        <Route path="/area/:kino" component ={OneCinema} />
        {/* <Route path="/about" component={About} /> */} */}
        <Redirect from ="*" to="/" />
        <IndexRoute component={App} />
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
