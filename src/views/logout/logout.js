import React        from 'react'
import { Redirect } from 'react-router'
import store        from '../../store'

class Logout extends React.Component {

    componentWillUnmount() {
        store.dispatch({ type: 'UNSELECT_CLIENT', payload: {} })
        store.dispatch({ type: 'LOGOUT', payload: {} })
    }

    render() {
        return <Redirect to='/'/>
    }
}

export default Logout