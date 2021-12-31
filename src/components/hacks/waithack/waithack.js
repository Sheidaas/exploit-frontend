import { FormControlLabel, Grid, Typography, MenuItem, Checkbox, ListItemText, Input} from '@material-ui/core'
import React                                   from 'react'
import { connect }                             from 'react-redux'
import store                                   from '../../../store'
import { ACTIONS }                             from '../../../utils/enums.js'

import { HackbarCheckbox, HackbarSlider, HackbarSelect} from '../../hackbar_style/hackbar_style.js'

const OBJECT_TYPES = {
    PLAYER: 6,
    METIN: 2,
    MONSTER: 0,
}


class Waithack extends React.Component {
    constructor( props ) {
        super(props)

    }

    valuetext = ( value ) => {
        return `${ value } units`;
    }

    SwitchEnabled = () => {
        let _module = {
            Enabled: !this.props.waithack.Enabled
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchAttackBlockedMonsters = () => {
        let _module = {
            AttackBlockedMonsters: !this.props.waithack.AttackBlockedMonsters,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    SwitchIsWallBetween = () => {
        let _module = {
            IsWallBetween: !this.props.waithack.IsWallBetween,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    SwitchUseCloudExploit = () => {
        let _module = {
            UseCloudExploit: !this.props.waithack.UseCloudExploit,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    onChangeRangeSlider = ( event, newValue ) => {
        console.log(newValue)
        let _module = {
            Range: newValue * 10,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    onChangeSpeedSlider = ( event, new_speed_value ) => {
        let _module = {
            Speed: new_speed_value / 1000,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    onChangeMaxMonsters = ( event, new_max_monsters_value ) => {
        let _module = {
            MaxMonsters: new_max_monsters_value,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'WaitHack' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }

    render = () => {
        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.waithack.Enabled }
                                                                 onChange={ () => this.SwitchEnabled() } name="mine"/> }
                                      label={ this.props.language.label_start }/>
                </Grid>
                <Grid item xs={ 12 }>
                    <HackbarSelect
                    onChange={ (event) => {
                        if(event.target.value === 'BOSS'){
                            let _module = {
                                AttackBosses: !this.props.waithack.AttackBosses,
                            }
                            store.dispatch({
                                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                                client: this.props.socket,
                                payload: { module_dict: _module, module_name: 'WaitHack' },
                                index: store.getState().receivePacketsReducer.selected_client_id
                            })
                    
                        }
                        else{
                            if(this.props.waithack.InstanceTypeToAttack.includes(event.target.value)){
                                let new_types = this.props.waithack.InstanceTypeToAttack.filter(index => index !== event.target.value)
                                let _module = {
                                    InstanceTypeToAttack: new_types,
                                }
                                console.log(_module)
                                store.dispatch({
                                    type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                                    client: this.props.socket,
                                    payload: { module_dict: _module, module_name: 'WaitHack' },
                                    index: store.getState().receivePacketsReducer.selected_client_id
                                })
                            }
                            else{
                                let new_types = this.props.waithack.InstanceTypeToAttack
                                new_types.push(event.target.value)
                                let _module = {
                                    InstanceTypeToAttack: new_types,
                                }
                                store.dispatch({
                                    type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                                    client: this.props.socket,
                                    payload: { module_dict: _module, module_name: 'WaitHack' },
                                    index: store.getState().receivePacketsReducer.selected_client_id
                                })
                            }

                        }

                    }}
                    input={ <Input/> }
                    value={Object.keys(OBJECT_TYPES).map( type => {'Select instances to attack'})}
                    renderValue={ ( selected ) => 'Select instances to attack' }
                    fullWidth>
                        <MenuItem key='boss' value='BOSS'>
                            <Checkbox checked={ this.props.waithack.AttackBosses } value={ 'BOSS' } />
                            <ListItemText primary={ 'Bosses'}/>
                        </MenuItem>
                        {   Object.keys(OBJECT_TYPES).map( type => {
                            return(
                                <MenuItem key={type} value={OBJECT_TYPES[type]}>
                                    <Checkbox checked={ this.props.waithack.InstanceTypeToAttack.includes(OBJECT_TYPES[type]) } value={ type } />
                                    <ListItemText primary={type}/>
                                </MenuItem>
                            )
                        })

                        }

                    </HackbarSelect>
                </Grid>
                <Grid item xs={ 4 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.waithack.UseCloudExploit }
                                                                 onChange={ () => this.SwitchUseCloudExploit() }
                                                                 name="mine"/> }
                                      label={ this.props.language.ninja_exploit }/>
                </Grid>
                <Grid item x={ 6 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.waithack.IsWallBetween }
                                                                 onChange={ () => this.SwitchIsWallBetween() }
                                                                 name="mine"/> }
                                      label={ this.props.language.check_is_wall }/>
                </Grid>
                <Grid item xs={ 6 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.waithack.AttackBlockedMonsters }
                                                                 onChange={ () => this.SwitchAttackBlockedMonsters() }
                                                                 name="mine"/> }
                                      label={ this.props.language.attack_blocked_monsters }/>
                </Grid>


                <Grid item xs={ 12 } className='item_slider'>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        { this.props.language.range }
                    </Typography>
                    <HackbarSlider
                        onChange={ this.onChangeRangeSlider }
                        defaultValue={ Math.round(this.props.waithack.Range / 10) }
                        getAriaValueText={ this.valuetext }
                        aria-labelledby="discrete-slider-small-steps"
                        step={ 1 }
                        min={ 27 }
                        max={ 400 }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        { this.props.language.speed }
                    </Typography>
                    <HackbarSlider
                        onChange={ this.onChangeSpeedSlider }
                        defaultValue={ Math.round(this.props.waithack.Speed * 1000) }
                        getAriaValueText={ this.valuetext }
                        aria-labelledby="discrete-slider-small-steps"
                        step={ 1 }
                        min={ 1 }
                        max={ 1000 }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        { this.props.language.max_monsters }
                    </Typography>
                    <HackbarSlider
                        onChange={ this.onChangeMaxMonsters }
                        defaultValue={ Math.round(this.props.waithack.MaxMonsters) }
                        getAriaValueText={ this.valuetext }
                        aria-labelledby="discrete-slider-small-steps"
                        step={ 5 }
                        marks
                        min={ 0 }
                        max={ 200 }
                        valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps( state ) {
    //console.log(state.receivePacketsReducer.character_status)
    return {
        waithack: state.receivePacketsReducer.hack_status.WaitHack
    }
}

export default connect(mapStateToProps)(Waithack)