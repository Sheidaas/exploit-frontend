import {
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Grid,
    ListItem,
    ListItemText,
    Typography
}                                          from '@material-ui/core'
import React                               from 'react'
import { FixedSizeList }                   from 'react-window';
import store                               from '../../../store'
import { ACTIONS }                         from '../../../utils/enums.js'
import { HackbarAccordion, HackbarButton } from '../../hackbar_style/hackbar_style.js'
import AutoDemontower                      from '../autodemontower/autodemontower'
import EnergyBot                           from '../energybot/energybot'

class ActionBot extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            expandedSchema: -1,
        }
    }

    SwitchEnabled = () => {
        let _module = {
            ...this.props.actionbot,
            Enabled: !this.props.actionbot.Enabled
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'ActionBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    DiscardSchema = () => {
        let _module = {
            ...this.props.actionbot,
            AlwaysUseWaithack: !this.props.actionbot.AlwaysUseWaithack
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'ActionBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    StopSchema = () => {
        let _module = {
            ...this.props.actionbot,
            DontUseWaithack: !this.props.actionbot.DontUseWaithack
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'ActionBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    ClearActions = () => {
        let _module = {
            ...this.props.actionbot,
            ClearActions: true
        }
        //console.log(_module)
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'ActionBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    render_all_actions = ( props ) => {
        const { index, style } = props;
        return (
            <div className='action'>
                <ListItem button key={ index } style={ style }>
                    <ListItemText primary={ `[${ index + 1 }] ${ this.props.actionbot.Actions[index].name }` }/>
                </ListItem>
            </div>
        )
    }

    render_all_waiters = ( props ) => {
        const { index, style } = props;
        return (
            <div className='waiter'>
                <ListItem button key={ index } style={ style }>
                    <ListItemText primary={ `[${ index + 1 }] ${ this.props.actionbot.Waiters[index] }` }/>
                </ListItem>
            </div>
        )
    }
    render = () => {
        //console.log(this.props.actionbot)
        return (
            <Grid container>
                <Grid item xs={ 6 }>
                    <Typography> Actions list </Typography>
                    <FixedSizeList height={ 200 } width={ '100%' } itemSize={ 30 }
                                   itemCount={ this.props.actionbot.Actions.length }>
                        { this.render_all_actions }
                    </FixedSizeList>
                </Grid>
                <Grid item xs={ 6 }>
                    <Typography> Waiters list </Typography>
                    <FixedSizeList height={ 200 } width={ '100%' } itemSize={ 20 }
                                   itemCount={ this.props.actionbot.Waiters.length }>
                        { this.render_all_waiters }
                    </FixedSizeList>
                </Grid>


                <Grid item xs={ 4 }>
                    <FormControlLabel control={ <Checkbox checked={ this.props.actionbot.Enabled }
                                                          onChange={ () => this.SwitchEnabled() } name="mine"/> }
                                      label="Start"/>
                </Grid>
                <Grid item xs={ 4 }>
                    <FormControlLabel control={ <Checkbox checked={ this.props.actionbot.AlwaysUseWaithack }
                                                          onChange={ () => this.SwitchAlwaysUseWaithack() }
                                                          name="mine"/> } label="Always use waithack"/>
                </Grid>
                <Grid item xs={ 4 }>
                    <FormControlLabel control={ <Checkbox checked={ this.props.actionbot.DontUseWaithack }
                                                          onChange={ () => this.SwitchDontUseWaithack() }
                                                          name="mine"/> } label="Dont use waithack"/>
                </Grid>
                <Grid item xs={ 6 }>
                    <HackbarButton onClick={ () => this.ClearActions() }> Clear actions </HackbarButton>
                </Grid>
                <Grid item xs={ 6 }>
                    <HackbarButton onClick={ () => this.ClearWaiters() }> Clear waiters </HackbarButton>
                </Grid>
                <Grid item xs={ 12 }>
                    <Grid item xs={ 12 }>
                        <Typography> Schemma runner </Typography>
                    </Grid>
                    <HackbarAccordion expanded={ this.state.expandedSchema === 0 }
                                      onChange={ () => this.switchExpandedSchema(0) }>
                        <AccordionSummary>
                            <Typography> EnergyBot </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EnergyBot socket={ this.props.socket }/>
                        </AccordionDetails>
                    </HackbarAccordion>
                    <HackbarAccordion expanded={ this.state.expandedSchema === 1 }
                                      onChange={ () => this.switchExpandedSchema(1) }>
                        <AccordionSummary>
                            <Typography> Demon Tower</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AutoDemontower socket={ this.props.socket }/>
                        </AccordionDetails>
                    </HackbarAccordion>
                </Grid>
            </Grid>
        )
    }
}

export default ActionBot