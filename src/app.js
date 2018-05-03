import React from 'react';
import axios from './axios'
import LogoInApp from './logoInApp'
import {Link} from 'react-router';
import {browserHistory} from 'react-router'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {}
  render() {

    return (<div className='main-container'>
      <div className='header'>
        <LogoInApp/>
        <a className='paint-white-bg' onClick={browserHistory.goBack}><br/>Back</a>
        <Link className='paint-white-bg' to='/welcome/'><br/>Showtimes By Area</Link>
        <Link id='saved-icon' className='paint-white-bg' to='/SavedForLater'><br/>Saved Cinemas</Link>
        <Link className='paint-white-bg' to='/Search'><br/>Search DB</Link>
        <Link className='paint-white-bg' to='/Contact'><br/>Contact</Link>
      </div>

      <div className='main-app-window'></div>
      <div className='app-container'>
        {this.props.children}
      </div>
      <div className='footer'>
        <div></div>

      </div>
    </div>)
  }
}
