import { Grid, Typography }                from '@material-ui/core'
import React                               from 'react'
import store                               from '../../../store'
import { ACTIONS }                         from '../../../utils/enums'
import { HackbarButton, HackbarTextField } from '../../hackbar_style/hackbar_style'

class EnergyBot extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            OPTIONS: { Repeats: 1 },
            NEEDED_OPTIONS: {}
        }
    }

    onStart = () => {
        store.dispatch({
            type: ACTIONS.SET_NEW_SCHEMA,
            payload: { message: this.state, name: 'EnergyBot' },
            index: store.getState().receivePacketsReducer.selected_client_id,
            client: this.props.socket
        })
    }

    onStartExchangeFragments = () => {
        store.dispatch({
            type: ACTIONS.SET_NEW_SCHEMA,
            payload: { message: this.state, name: 'EnergyBotExchangeFragments' },
            index: store.getState().receivePacketsReducer.selected_client_id,
            client: this.props.socket
        })
    }

    onChangeRepeats = ( new_value ) => {
        if ( new_value < 1 || new_value > 99 ) {
            return
        }
        this.setState({ ...this.state, Repeats: new_value })
    }

    render = () => {
        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <Typography> <b> { this.props.language.name } </b> { this.props.language.description } </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography> <b> { this.props.language.remember } </b> { this.props.language.remember_description }
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <HackbarTextField helperText={ this.props.language.repeats_helper_text } type='number'
                                      onKeyDown={ e => e.stopPropagation() } value={ this.state.OPTIONS.Repeats }
                                      onChange={ ( e ) => this.onChangeRepeats(parseInt(e.target.value)) }
                                      defaultValue={ this.state.Repeats } fullWidth={ true } margin={ 'dense' }/>
                </Grid>
                <Grid item xs={ 6 }>
                    <HackbarButton onClick={ () => this.onStart() }> { this.props.language.start } </HackbarButton>
                </Grid>
                <Grid item xs={ 6 }>
                    <HackbarButton
                        onClick={ () => this.onStartExchangeFragments() }> { this.props.language.start_and_exchange_fragments } </HackbarButton>
                </Grid>
            </Grid>
        )
    }

}

export default EnergyBot