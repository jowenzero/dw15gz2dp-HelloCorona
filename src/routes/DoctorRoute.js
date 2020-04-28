import React from "react";
import { Redirect, Route } from "react-router-dom";

const DoctorRoute = ({component: Component,...rest}) => {
    return (
        <Route {...rest} render={props => (
            (localStorage.getItem("userLogin") === "true" && localStorage.getItem("userListAs") === "Doctor") 
            ? <Component {...props}/> 
            : <Redirect to="/"/>
        )} />   
    );
};

export default DoctorRoute;