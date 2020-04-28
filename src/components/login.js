import React from 'react';

import HeaderLogin from '../components/header_login'
import Header from '../components/header'

const Login = () => {
    if (localStorage.getItem('userLogin') === 'true') {
        return <HeaderLogin role={localStorage.getItem('userListAs')}/>
    }
    else {
        return <Header/>
    }
}

export default Login;