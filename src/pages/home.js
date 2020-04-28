import React, { Component } from 'react';

import Login from '../components/login';
import Jumbotron from '../components/jumbotron';
import Content from '../components/content';

class Home extends Component {
    render() {
        return (
            <div>
                <Login/>
                <Jumbotron/>
                <Content/>
            </div>
        );
    }
}

export default Home;