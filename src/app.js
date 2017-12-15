import React from 'react';
import axios from './axios'
import Logo from './logo'




export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {

    }
    render() {

        return (
            <div>
                <div>This is app</div>
                <Logo />
            </div>
        )
    }
}
