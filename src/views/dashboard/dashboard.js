import { Grid, Paper, Typography } from '@material-ui/core';
import moment                      from 'moment';
import React                       from 'react'
import { connect }                 from 'react-redux';
import { Redirect }                from 'react-router';
import MetinClientsList            from '../../components/MetinClientsList/MetinClientsList';
import store                       from '../../store.js'
import auth                        from '../../utils/auth';
import { ACTIONS }                 from '../../utils/enums.js';
import './dashboard.css'

class Dashboard extends React.Component {
    constructor( props ) {
        super(props)
        this.SocketToLocalServer = this.props.socket
        this.state = {
            interval: setInterval(() => {
                this.getMetinClientList();
            }, 5),
            metin_clients: [],
            selected_client_index: 0,
        }
    }

    getMetinClientList = () => {
        store.dispatch({ type: ACTIONS.GET_METIN_CLIENT_LIST, client: this.SocketToLocalServer })
    }

    render() {
        if ( !auth.getUserInfo().apiKey ) {
            return <Redirect to={ '/login' }/>
        }

        return (
            <Grid container id='container' maxWidth='Fluid'>
                <Grid container xs={ 12 } className="stages" justifyContent='center'>
                    <Grid item xs={ 10 } md={ 2 }>
                        <Paper variant='outlined' square className='user-info'>
                            <Typography> { this.props.language.greetings } { auth.getUserInfo().username }</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={ 10 } md={ 6 }>
                        <Grid container spacing={ 2 } columns={ { xs: 4, sm: 8, md: 12 } }>
                            <MetinClientsList clients={ this.props.clients } socket={ this.props.socket }
                                              language={ this.props.metinclientslist_language }/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps( state ) {
    return {
        clients: state.receivePacketsReducer.clients
    }
}

function GetIsUserPremiumAsString( premiumEnd ) {
    let is_user_premium = IsUserPremium(premiumEnd)

    if ( is_user_premium ) {
        return (
            <Typography> You are Premium User untill { ParseEndDate(premiumEnd) }</Typography>
        )
    } else {
        return (
            <Typography> You are free user. Get premium here. </Typography>
        )
    }
}

function IsUserPremium( premiumEnd ) {
    let end_date = new Date(premiumEnd)
    let now = Date.now()
    if ( end_date.getTime() < now ) {
        return false
    }
    return true
}

function ParseEndDate( _premiumEnd ) {
    let premium_end = new Date(_premiumEnd)
    return moment(premium_end).format("dddd, MMMM Do YYYY, hh:mm:ss a")

}

export default connect(mapStateToProps)(Dashboard) 