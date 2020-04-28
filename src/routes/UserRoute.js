import React from "react";
import { Redirect, Route } from "react-router-dom";

const UserRoute = ({component: Component,...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem("userLogin") === "true" && localStorage.getItem("userListAs") === "Patient") 
            ? <Component {...props}/> 
            : <Redirect to="/"/>
        )} />   
    );
};

export default UserRoute;