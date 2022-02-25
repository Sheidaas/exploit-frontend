import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import axios                                          from 'axios';
import React                                          from 'react'
import { Redirect }                                   from 'react-router';
import { Link }                                       from 'react-router-dom'
import Description                                    from '../../components/login-register-desc/desc'
import store                                          from '../../store.js'
import auth                                           from '../../utils/auth';
import { URLS }                                       from '../../utils/enums';
import './login.css'

class Login extends React.Component {
    constructor( props ) {
        super(props)
        this.redirect = false
        this.username = ''
        this.password = ''

        this.handleOnUsernameChange = this.onUsernameChange.bind(this)
        this.handleOnPasswordChange = this.onPasswordChange.bind(this)
        this.handleOnLoginButton = this.onLoginButton.bind(this)
        this.handleSetUser = this.props._render.bind(this)
    }

    onUsernameChange( event ) {
        this.username = event.target.value
    }

    onPasswordChange( event ) {
        this.password = event.target.value
    }

    onLoginButton() {
        const params = new URLSearchParams()
        params.append('username', this.username)
        params.append('password', this.password)
        
        axios({
            method: 'post',
            url: URLS['login'],
            data: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            response => {
                axios.get(URLS['get_user'], {headers: {
                    Authorization: 'Bearer ' + response.data.access_token
                }}).then( _response => {
                    store.dispatch({
                        type: 'LOGIN', payload: {
                            username: this.username,
                            apiKey: response.data.access_token,
                            points: _response.data.points,
                            premiumEnd: _response.data.premiumEnd,
                        }
                    })
                    this.handleSetUser()
                    this.redirect = true
                    this.forceUpdate()
                }).catch(error => console.log(error))
            }
        ).catch(error => console.log(error))
    }

    render() {
        if ( this.redirect || auth.getUserInfo().apiKey ) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <Grid container id='container' maxWidth='Fluid' spacing={ 1 }>
                <Grid item md={ 3 }></Grid>
                <Description language={ this.props.description_language }/>
                <Grid item xs={ 10 } md={ 3 } className="login-box">
                    <Paper className='login-display' variant='outlined' square>
                        <Grid item>
                            <div className='login-header'> { this.props.language.header } </div>
                        </Grid>
                        <form>
                            <Grid item>
                                <Grid item className='login-input'>
                                    <TextField required label={ this.props.language.label_username }
                                               helperText={ this.props.language.label_username_helper_text }
                                               onChange={ ( e ) => this.handleOnUsernameChange(e) }/>
                                </Grid>
                                <Grid item className='login-input'>
                                    <TextField required label={ this.props.language.label_register }
                                               helperText={ this.props.language.label_register_helper_text }
                                               type='password' onChange={ ( e ) => this.handleOnPasswordChange(e) }/>
                                </Grid>
                                <Grid item className='login-input'>
                                    <Button variant='outlined'
                                            onClick={ () => this.handleOnLoginButton() }> { this.props.language.login } </Button>
                                </Grid>
                            </Grid>
                            <Grid item className='login-links'>
                                <Link to='/signup'>
                                    <Grid item className='link'>
                                        <Typography>  { this.props.language.sign_up } </Typography>
                                    </Grid>
                                </Link>
                                <Link to='/password_reset'>
                                    <Grid item className='link'>
                                        <Typography> { this.props.language.forget_password } </Typography>
                                    </Grid>
                                </Link>
                            </Grid>
                        </form>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default Login