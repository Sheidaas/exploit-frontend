import { Link as mLink, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import React                                                  from 'react'
import { connect }                                            from 'react-redux';
import { Link }                                               from 'react-router-dom'
import store                                                  from "../../store";
import auth                                                   from '../../utils/auth';
import { ACTIONS, LANGUAGES_CODES }                           from "../../utils/enums";
import { HackbarAppBar }                                      from '../hackbar_style/hackbar_style';
import './MenuBar.css'

class MenuBar extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            menu: false,
            anchorEl: null,
        }
    }

    render() {
        let client_option = <> </>
        if ( this.props.selected_client_id > -1 ) {
            client_option =
                <>
                    <div className='bar-option'>
                        <Link to='/client'>
                            <mLink>
                                <Typography variant="h6" className='bar-option-title'>
                                    { this.props.language.client }
                                </Typography>
                            </mLink>
                        </Link>
                    </div>
                </>
        }

        return (
            <HackbarAppBar position="static">
                <Toolbar>
                    <div className='bar-option'>
                        <Link to='/'>
                            <mLink>
                                <Typography variant="h6" className='bar-option-title'>
                                    { this.props.language.open_bot }
                                </Typography>
                            </mLink>
                        </Link>
                    </div>
                    { !this.props.apiKey &&
                    <div className='bar-option'>
                        <Link to='/login'>
                            <mLink>
                                <Typography variant="h6"
                                            className='bar-option-title'> { this.props.language.login } </Typography>
                            </mLink>
                        </Link>

                    </div> }
                    { !this.props.apiKey &&
                    <div className='bar-option'>
                        <Link to='/signup'>
                            <mLink>
                                <Typography variant="h6"
                                            className='bar-option-title'> { this.props.language.register } </Typography>
                            </mLink>
                        </Link>
                    </div> }

                    { this.props.apiKey &&
                    <div className='bar-option'>
                        <Link to='/dashboard'>
                            <mLink>
                                <Typography variant="h6" className='bar-option-title'>
                                    { this.props.language.dashboard }
                                </Typography>
                            </mLink>
                        </Link>
                    </div> }
                    { client_option }
                    { this.props.apiKey &&
                    <div className='bar-option'>
                        <Link to='/logout'>
                            <mLink>
                                <Typography variant="h6" className='bar-option-title'>
                                    { this.props.language.logout }
                                </Typography>
                            </mLink>
                        </Link>
                    </div> }
                    <div className='bar-option'>
                        <Typography variant="h6" className='bar-option-title' onClick={ ( e ) => this.OpenMenu(e) }>
                            { this.props.language.language }
                        </Typography>
                        <Menu
                            id="simple-menu"
                            anchorEl={ this.state.anchorEl }
                            open={ Boolean(this.state.menu) }
                            onClose={ () => this.CloseMenu(0) }
                        >
                            <MenuItem disabled> { this.props.language.curr_language } </MenuItem>
                            <MenuItem
                                onClick={ () => this.CloseMenu(LANGUAGES_CODES.ENGLISH) }> { this.props.language.lang_english } </MenuItem>
                            <MenuItem
                                onClick={ () => this.CloseMenu(LANGUAGES_CODES.GERMAN) }> { this.props.language.lang_german } </MenuItem>
                            <MenuItem
                                onClick={ () => this.CloseMenu(LANGUAGES_CODES.TURKISH) }> { this.props.language.lang_turkish } </MenuItem>
                            <MenuItem
                                onClick={ () => this.CloseMenu(LANGUAGES_CODES.ROMANIAN) }> { this.props.language.lang_romanian } </MenuItem>
                            <MenuItem
                                onClick={ () => this.CloseMenu(LANGUAGES_CODES.POLISH) }> { this.props.language.lang_polish } </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

            </HackbarAppBar>
        )
    }

    OpenMenu = ( event ) => {
        event.stopPropagation()
        this.setState({ ...this.state, menu: true, anchorEl: event.currentTarget })
    }

    ChangeLanguage = ( language ) => {
        let index = store.getState().receivePacketsReducer.selected_client_id
        store.dispatch({ type: language })
        store.dispatch({
            type: ACTIONS.GET_FULL_SERVER_STATUS,
            payload: { client: this.props.socket, index: index, language: language }
        })
        auth.set(store.getState().languageReducer.language_type, 'language_type', true)
    }

    CloseMenu = ( action_value ) => {
        if ( action_value === 0 ) {
            this.setState({ menu: false, anchorEl: null })
        } else {
            this.ChangeLanguage(action_value)
            this.setState({ ...this.state, menu: false, anchorEl: null })
        }

    }

}

function mapStateToProps( state ) {
    return {
        apiKey: auth.getUserInfo().apiKey,
        selected_client_id: state.receivePacketsReducer.selected_client_id
    }
}

/*
                { this.props.apiKey &&
                    <div className='bar-option'>
                        <Link to='/schema_creator'>
                            <mLink>
                                <Typography variant="h6" className='bar-option-title'>
                                    TaskBot
                                </Typography>
                            </mLink>
                        </Link>
                    </div>
                }
 */

export default connect(mapStateToProps)(MenuBar)
