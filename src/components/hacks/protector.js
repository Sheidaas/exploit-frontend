import React                                            from 'react'
import IconButton                     from "@material-ui/core/IconButton";
import PauseIcon                      from '@mui/icons-material/Pause';
import PlayCircleFilledIcon           from '@mui/icons-material/PlayCircleFilled';
import StopIcon                       from '@mui/icons-material/Stop';
class Protector extends React.Component {



{
this.props.farmbot.Enabled==='ENABLED'
? <PauseIcon sx={ { color: grey[400] } } fontSize="large"/>
: <PlayCircleFilledIcon color="success" fontSize="large"/>
}
</IconButton>

</Grid>

    render = () => {

        switchAvoidPlayers = () => {
            let _module = {
                Enabled: !this.props.fishbot.Enabled
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'Protector' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }

        return(
            <Grid container>
                <Grid item xs={ 12 }>
                    <IconButton onClick={() => this.SwitchEnabled( this.props.farmbot.Enabled==='ENABLED'
                                                                    ? 'PAUSED'
                                                                    : 'ENABLED')}>
                    <IconButton onClick={ () => this.SwitchEnabled( 'STOPPED' )}>
                        <StopIcon sx={ { color: red[700] } } fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
    }

}