import React from 'react';
import axios from './axios'
import Logo from './logo'
// import { Link } from 'react-router';
import { Link } from 'react-router-dom'
import {browserHistory} from "react-router";
import {hashHistory} from "react-router";
import {LinkContainer, Navbar, Nav, NavItem, indexLinkContainer} from 'react-router-bootstrap'
import { MenuItem, NavDropdown, Button , DropdownButton, SplitButton} from 'react-bootstrap'



export default class areaChoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.handleClick = this.handleClick.bind(this)

    }


    handleClick(e) {
        console.log('in handleClick');
         this.setState({selectValue: e.target.value}, ()=> {
             console.log('this is the selectVal state: ',this.state.selectValue)


             browserHistory.push(`${this.state.selectValue}`);
             // location.replace(`${this.state.selectValue}`);
         });

    }

componentDidMount() {

}
    render() {

    return (
        <div className='area-choice-ui'>


            {/* THIS IS THE OPTION THAT WORKS WITH REACT, BUT MAYBE NOT WITH handlebars */}
            <SplitButton title="My Area..." pullRight id="split-button-pull-right">
        <MenuItem href='/areas/Kreuzberg' eventKey="1">Kreuzberg</MenuItem>
        <MenuItem href="/areas/Neukoelln" eventKey="2">Neukoelln</MenuItem>
        <MenuItem href="/areas/Schoeneberg" eventKey="3">Schoeneberg</MenuItem>
        <MenuItem href="/areas/Mitte" eventKey="4">Mitte</MenuItem>
        <MenuItem href="/areas/PrenzlauerBerg" eventKey="5">Prenzlauer Berg</MenuItem>
        <MenuItem href="/areas/Friedrichshain" eventKey="6">Friedrichshain</MenuItem>
        <MenuItem href="/areas/Wedding"eventKey="7">Wedding</MenuItem>
      </SplitButton>

      {/* THIS IS THE OPTION THAT WORKS WITH HANDLEBARS */}

                {/* <select name="area-selector" id="area-selector" size="1" onChange={this.handleClick}>
                    <option value="">My Area…</option>
                    <option value="/areas/kreuzberg" onChange={(e) => this.setState({value: e.target.value})}>Kreuzberg</option>
                    <option value="/areas/Neukoelln">Neukoelln</option>
                    <option value="/areas/Schoeneberg">Schoeneberg</option>
                    <option value="/areas/Mitte">Mitte</option>
                    <option value="/areas/friedrichshain">friedrichshain</option>
                    <option value="/areas/PrenzlauerBerg">Prenzlauer Berg</option>
                    <option value="/areas/Wedding">Wedding</option> */}
                {/* </select> */}

        </div>

    )
    }
}
