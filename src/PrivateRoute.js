import React               from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth                from './utils/auth'

export const PrivateRoute = ( { component: Component, ...rest } ) => (
    <Route { ...rest } render={ props => {

        if ( !auth.getUserInfo().apiKey ) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={ { pathname: '/login', state: { from: props.location } } }/>
        }

        // authorised so return component
        return <Component { ...props } { ...rest }/>
    } }/>
)