import { Box, Button, Card, CardContent, CardMedia, Grid, LinearProgress, Typography } from '@material-ui/core';
import React                                                                   from "react"
import { withRouter }                                                          from 'react-router-dom'
import blank_image                                                             from '../../images/blank-class-image.png'
import sura                                                                    from '../../images/characters/Sura.png'

import warrior_m from '../../images/characters/warrior_m.png'
import warrion_w from '../../images/characters/warrior_w.png'
import sura_m from '../../images/characters/sura_m.png'
import sura_w from '../../images/characters/sura_w.png'
import assassin_m from '../../images/characters/assassin_m.png'
import assassin_w from '../../images/characters/assassin_w.png'
import shaman_m from '../../images/characters/shaman_m.png'
import shaman_w from '../../images/characters/shaman_w.png'
import wolfman_m from '../../images/characters/wolfman_m.png'


import store                                                                   from "../../store";
import { ACTIONS }                                                             from '../../utils/enums.js'
import { getNiceLookingStringFromMapName }                                     from '../../utils/functions.js'

const RACES_IMAGES = {
	WARRIOR_MALE_ID: warrior_m,
	WARRIOR_FEMALE_ID: warrion_w,
	SURA_MALE_ID: sura_m,
	SURA_FEMALE_ID: sura_w,
	NINJA_MALE_ID: assassin_m,
	NINJA_FEMALE_ID: assassin_w,
	SHAMAN_MALE_ID: shaman_m,
	SHAMAN_FEMALE_ID: shaman_w,    
    WOLFMAN_ID: wolfman_m
}


class MetinClientsList extends React.Component {
    constructor( props ) {
        super(props)

    }

    render() {
        return (
            this.props.clients.map(( client, i ) => {
                return <Grid item xs={ 2 } sm={ 4 } md={ 4 } key={ i }>
                    <MetinClient client={ client } id={ i } history={ this.props.history } socket={ this.props.socket }
                                 language={ this.props.language }/>
                </Grid>
            })
        )
    }
}

class MetinClient extends React.Component {
    constructor( props ) {
        super(props)
    }

    handleClickOnClient = ( client ) => {
        let language = store.getState().languageReducer.language_type
        store.dispatch({ type: ACTIONS.SELECT_CLIENT, payload: client })
        store.dispatch({
            type: ACTIONS.GET_FULL_SERVER_STATUS,
            payload: { client: this.props.socket, index: client.id, language: language }
        })
        const { history } = this.props;
        if ( history ) history.push('/client');
    }

    render = () => {
        if ( this.props.client.player_name !== 'None' ) {
            return (
                <Card onClick={ () => this.handleClickOnClient(this.props.client) }>
                    <CardMedia
                        component={ "img" }
                        src={ RACES_IMAGES[this.props.client.player_curr_race] }
                        alt={ "sura" }
                        onError={ blank_image }
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant={ "h5" }>
                            { this.props.client.player_name } ({ this.props.client.player_level })
                        </Typography>
                        <Typography>
                            { getNiceLookingStringFromMapName(this.props.client.player_curr_map) } ({ Math.round(this.props.client.player_position[0] / 100) }, { Math.round(this.props.client.player_position[1] / 100) })
                        </Typography>
                        <Box sx={ { display: 'flex' } }>
                            <Box sx={ { width: '100%', mt: 1 } }>
                                <LinearProgress variant="determinate"
                                                value={ Math.round(( this.props.client.player_experience / this.props.client.player_max_experience ) * 100) }/>
                                <Typography variant="body2" color="text.secondary">
                                    { this.props.language.exp } { this.props.client.player_experience }/{ this.props.client.player_max_experience } { Math.round(( this.props.client.player_experience / this.props.client.player_max_experience ) * 100) }%
                                </Typography>
                            </Box>
                        </Box>
                        

                    </CardContent>
                    <Button onClick={ () => {
                            store.dispatch({ type: ACTIONS.SELECT_CLIENT, payload: this.props.client })
                            let _module = {
                                ExitMetin: true,
                            }
                            store.dispatch({
                                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                                client: this.props.socket,
                                payload: { module_dict: _module, module_name: 'Settings' },
                                index: store.getState().receivePacketsReducer.selected_client_id
                            })
                        }}> Exit </Button>
                </Card>
            )
        } else {
            return null
        }
    }

}

export default withRouter(MetinClientsList) 