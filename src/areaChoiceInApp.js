import React from 'react';
import axios from './axios'
import Logo from './logo'
// import { Link } from 'react-router';
import {Link} from 'react-router-dom'
import {browserHistory} from "react-router";
import {hashHistory} from "react-router";
import {LinkContainer, Navbar, Nav, NavItem, indexLinkContainer} from 'react-router-bootstrap'
import {MenuItem, NavDropdown, Button, DropdownButton, SplitButton} from 'react-bootstrap'

export default class AreaChoiceInApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({
      selectValue: e.target.value
    }, () => {
      browserHistory.push(`${this.state.selectValue}`);
    });
  }

  componentDidMount() {}
  render() {

    return (<div className='extend-choice'>
      <div className='area-choice-hero'>
        <h1>
          <strong>Dubbing?</strong>
        </h1>
        <h1>Please Don't</h1>
      </div>
      <div className='choice-app-hero-ui-container'>
        <div className='area-choice-ui' id='choice-in-app-dropdown'>

          <SplitButton title="Choose Area..." pullRight="pullRight" id="split-button-pull-right">
            <MenuItem href='/areas/Kreuzberg' eventKey="1">Kreuzberg</MenuItem>
            <MenuItem href="/areas/Neukoelln" eventKey="2">Neukoelln</MenuItem>
            <MenuItem href="/areas/Schoeneberg" eventKey="3">Schoeneberg</MenuItem>
            <MenuItem href="/areas/Mitte" eventKey="4">Mitte</MenuItem>
            <MenuItem href="/areas/PrenzlauerBerg" eventKey="5">Prenzlauer Berg</MenuItem>
            <MenuItem href="/areas/Friedrichshain" eventKey="6">Friedrichshain</MenuItem>
            <MenuItem href="/areas/Wedding" eventKey="7">Wedding</MenuItem>
          </SplitButton>

        </div>
        <div className='side-of-choice-in-app'>
          <h3 className='side-of-choice-in-app-content'>ENJOY BERLIN&#39;S CINEMA EXPERIENCE IN ENGLISH</h3>

          <h3 className='side-of-choice-in-app-content'>______</h3>
          <br/>
          <h4 className='side-of-choice-in-app-content'>Check out cinemas in your area,<br/>
            find movies screened in English,
            <br/>and get info about movies in our database.</h4>
        </div>
      </div>
    </div>)
  }
}
