import React from 'react';
import Logo from './logo';
import { Link } from 'react-router';


export default class Welcome extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div>
                <div>This is Welcome</div>
                <Logo />
            </div>
        )
    }
}
