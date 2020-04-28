import React, { Component } from 'react';

import Login from '../components/login';
import Jumbotron from '../components/jumbotron';
import Content from '../components/content';
import ConsultList from '../components/consult_list';

class Home extends Component {
    render() {
        return (
            <div>
                <Login/>
                { localStorage.getItem('userListAs') === 'Patient' &&
                    <>
                        <Jumbotron/>
                        <Content/>
                    </>
                }
                { localStorage.getItem('userListAs') === 'Doctor' &&
                    <>
                        <ConsultList/>
                    </>
                }
            </div>
        );
    }
}

export default Home;