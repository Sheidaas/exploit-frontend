import { FormControlLabel, Grid, ListItem, Menu, MenuItem, Popover, Typography } from '@material-ui/core'
import React                                                                     from 'react'
import { FixedSizeList, shouldComponentUpdate }                                  from "react-window";
import store                                                                     from '../../../store'
import { ACTIONS }                                                               from '../../../utils/enums.js'
import {
    HackbarButton,
    HackbarCheckbox,
    HackbarSlider
}                                                                                from '../../hackbar_style/hackbar_style.js'
import './fishbot.css'

const fish = [
    27803,
    27804,
    27805,
    27806,
    27807,
    27808,
    27809,
    27810,
    27811,
    27812,
    27813,
    27814,
    27815,
    27816,
    27817,
    27818,
    27819,
    27820,
    27821,
    27822,
    27823,
    27824,
    27825,
    27826,
    27827,
    27828,
    27829,
    27830,
    27831,
    27832,
]

const dead_fish = [
    27833,
    27834,
    27835,
    27836,
    27837,
    27838,
    27839,
    27840,
    27841,
    27842,
    27843,
    27844,
    27845,
    27845,
    27847,
    27848,
    27849,
    27850,
    27851,
    27852,
    27853,
    27854,
    27855,
    27856,
    27857,
    27858,
    27859,
    27860,
    27861,
    27862,
]

const catches = [
    70048,
    70051,
    70050,
    70049,
    50002,
    80008,
    50008,
    50009,
    50043,
    70201,
    70203,
    70205,
    70204,
    70206,
    70202
]

class Fishbot extends React.Component {
    constructor( props ) {
        super(props)
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this)

    }

    SwitchEnabled = () => {
        let _module = {
            Enabled: !this.props.fishbot.Enabled
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }
    SwitchInstantFishing = () => {
        let _module = {
            InstantFishing: !this.props.fishbot.InstantFishing
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }
    SwitchGrillFish = () => {
        let _module = {
            GrillFish: !this.props.fishbot.GrillFish
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    SwitchCheckRepetitions = () => {
        let _module = {
            CheckRepetitions: !this.props.fishbot.CheckRepetitions
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    OnFishToKillChange = ( fish_id ) => {
        let new_fish_to_kill = this.props.fishbot.FishIdToOpen
        if ( new_fish_to_kill.includes(fish_id) ) {
            new_fish_to_kill = new_fish_to_kill.filter(( element ) => element !== fish_id)
        } else {
            console.log(new_fish_to_kill)
            new_fish_to_kill.push(fish_id)
        }
        let _module = {
            FishIdToOpen: new_fish_to_kill
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    RenderFishToKill = ( props ) => {
        const { index, style } = props;
        let checked = false
        if ( this.props.fishbot.FishIdToOpen.includes(fish[index]) ) {
            checked = true
        }
        return (
            <ListItem button key={ index } style={ style }>
                <FormControlLabel control={ <HackbarCheckbox checked={ checked } name="mine"
                                                             onChange={ () => this.OnFishToKillChange(fish[index]) }/> }
                                  label={ this.props.item_list[fish[index]].name }/>
            </ListItem>
        )
    }

    RenderDeadFish = ( props ) => {
        const { index, style } = props;
        return (
            <ListItem button key={ index } style={ style }>
                <NewDeadFishListItem fish_id={ dead_fish[index] }
                                     DeadFishIdToDrop={ this.props.fishbot.DeadFishIdToDrop }
                                     DeadFishIdToGrill={ this.props.fishbot.DeadFishIdToGrill }
                                     language={ this.props.new_dead_fish_list_item_lanugage }
                                     item_list={ this.props.item_list }
                                     fishbot={ this.props.fishbot } socket={ this.props.socket }/>
            </ListItem>
        )
    }

    RenderCatches = ( props ) => {
        const { index, style } = props;
        return (
            <ListItem button key={ index } style={ style }>
                <NewCatchesListItem catch_id={ catches[index] }
                                    CatchesToDrop={ this.props.fishbot.CatchesToDrop }
                                    CatchesToSell={ this.props.fishbot.CatchesToSell }
                                    language={ this.props.new_catches_list_item_lanugage }
                                    item_list={ this.props.item_list }
                                    fishbot={ this.props.fishbot } socket={ this.props.socket }/>
            </ListItem>
        )
    }

    sliderTextValue = ( value ) => {
        return '${value}s'
    }

    OnTimeBetweenFishChange = ( event, newValue, activeThumb ) => {
        if ( !Array.isArray(newValue) ) {
            return
        }

        let new_value
        if ( newValue[1] - newValue[0] < 3 ) {
            if ( activeThumb === 0 ) {
                const clamped = Math.min(newValue[0], 15 - 3);
                new_value = [ clamped, clamped + 3 ]
            } else {
                const clamped = Math.max(newValue[1], 3);
                new_value = [ clamped - 3, clamped ]
            }
        } else {
            new_value = newValue
        }

        let _module = {
            MinTimeBetweenFish: new_value[0],
            MaxTimeBetweenFish: new_value[1]
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }

    OnMaxRepetitionsChange = ( event, new_value ) => {
        console.log(new_value)
        let _module = {
            MaxRepetitions: new_value
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }

    render = () => {
        //console.log(this.props.fishbot)
        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.fishbot.Enabled }
                                                                 onChange={ () => this.SwitchEnabled() } name="mine"/> }
                                      label={ this.props.language.label_start }/>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.fishbot.GrillFish }
                                                                 onChange={ () => this.SwitchGrillFish() }
                                                                 name="mine"/> }
                                      label={ this.props.language.label_grill_fish }/>
                </Grid>
                <Grid item xs={ 12 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.fishbot.InstantFishing }
                                                                 onChange={ () => this.SwitchInstantFishing() }
                                                                 name="mine"/> }
                                      label={ this.props.language.label_instant_fish }/>
                    { !this.props.fishbot.InstantFishing &&
                    <>
                        <Typography> { this.props.language.random_time } </Typography>
                        <HackbarSlider
                            value={ [ this.props.fishbot.MinTimeBetweenFish, this.props.fishbot.MaxTimeBetweenFish ] }
                            min={ 1 } max={ 15 } marks valueLabelDisplay={ true }
                            getAriaValueText={ this.sliderTextValue } disableSwap
                            onChange={ this.OnTimeBetweenFishChange }
                        />
                    </>
                    }
                </Grid>
                <Grid item xs={ 12 }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ this.props.fishbot.CheckRepetitions }
                                                                 onChange={ () => this.SwitchCheckRepetitions() }
                                                                 name="mine"/> }
                                      label={ this.props.language.label_repetitions }/>
                    { this.props.fishbot.CheckRepetitions &&
                    <>
                        <Typography> { this.props.language.number_of_repetitions } { this.props.fishbot.Repetitions } </Typography>
                        <HackbarSlider value={ this.props.fishbot.MaxRepetitions } min={ 100 } max={ 2000 } step={ 25 }
                                       valueLabelDisplay={ true } onChange={ this.OnMaxRepetitionsChange }/>
                    </>
                    }
                </Grid>
                <Grid item xs={ 12 }>
                    <div className={ 'list_header' }>
                        <Typography> { this.props.language.fish_to_kill_choice } </Typography>

                    </div>
                    <FixedSizeList height={ 150 } width={ '100%' } itemSize={ 25 } itemCount={ fish.length }
                                   onChange={ () => this.shouldComponentUpdate() }>
                        { this.RenderFishToKill }
                    </FixedSizeList>
                </Grid>
                <Grid item xs={ 6 }>
                    <div className={ 'list_header' }>
                        <Typography> { this.props.language.dead_fish_choice } </Typography>

                    </div>
                    <FixedSizeList height={ 150 } width={ '100%' } itemSize={ 50 } itemCount={ dead_fish.length }
                                   onChange={ () => this.shouldComponentUpdate() }>
                        { this.RenderDeadFish }
                    </FixedSizeList>
                </Grid>
                <Grid item xs={ 6 }>
                    <div className={ 'list_header' }>
                        <Typography> { this.props.language.catches_choice } </Typography>

                    </div>
                    <FixedSizeList height={ 150 } width={ '100%' } itemSize={ 50 } itemCount={ catches.length }
                                   onChange={ () => this.shouldComponentUpdate() }>
                        { this.RenderCatches }
                    </FixedSizeList>
                </Grid>
            </Grid>
        )
    }
}

class NewCatchesListItem extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            menu: false,
            anchorEl: null
        }
    }

    CloseMenu = ( action_value ) => {
        console.log(action_value)
        if ( !action_value ) {
            this.setState({ ...this.state, menu: !this.state.menu })
        } else if ( action_value === 1 ) {
            this.OnCatchesToSellChange(this.props.catch_id)
        } else if ( action_value === 2 ) {
            this.OnCatchesToDropChange(this.props.catch_id)
        } else if ( action_value === 3 ) {
            this.OnNothingChange(this.props.catch_id)
        }

    }

    OnCatchesToSellChange = ( catch_id ) => {
        this.CloseMenu(0)
        let new_catches_to_sell = this.props.CatchesToSell
        let new_catches_to_drop = this.props.CatchesToDrop
        if ( new_catches_to_sell.includes(catch_id) ) {
            new_catches_to_sell = new_catches_to_sell.filter(( element ) => element !== catch_id)
        } else {
            new_catches_to_sell.push(catch_id)
            if ( new_catches_to_drop.includes(catch_id) ) {
                new_catches_to_drop = new_catches_to_drop.filter(( element ) => element !== catch_id)
            }
        }
        let _module = {
            ...this.props.fishbot,
            CatchesToSell: new_catches_to_sell,
            CatchesToDrop: new_catches_to_drop
        }
        console.log(_module)
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    OnCatchesToDropChange = ( catch_id ) => {
        this.CloseMenu(0)
        let new_catches_to_sell = this.props.CatchesToSell
        let new_catches_to_drop = this.props.CatchesToDrop
        if ( new_catches_to_drop.includes(catch_id) ) {
            new_catches_to_drop = new_catches_to_drop.filter(( element ) => element !== catch_id)
        } else {
            new_catches_to_drop.push(catch_id)
            if ( new_catches_to_sell.includes(catch_id) ) {
                new_catches_to_sell = new_catches_to_sell.filter(( element ) => element !== catch_id)
            }
        }

        let _module = {
            CatchesToSell: new_catches_to_sell,
            CatchesToDrop: new_catches_to_drop
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    OnNothingChange = ( catch_id ) => {
        this.CloseMenu(0)
        let new_catches_to_sell = this.props.CatchesToSell
        let new_catches_to_drop = this.props.CatchesToDrop
        if ( new_catches_to_drop.includes(catch_id) ) {
            new_catches_to_drop = new_catches_to_drop.filter(( element ) => element !== catch_id)
        }
        if ( new_catches_to_sell.includes(catch_id) ) {
            new_catches_to_sell = new_catches_to_sell.filter(( element ) => element !== catch_id)
        }

        if ( new_catches_to_sell !== this.props.CatchesToSell || new_catches_to_drop !== this.props.CatchesToDrop ) {
            let _module = {
                CatchesToSell: new_catches_to_sell,
                CatchesToDrop: new_catches_to_drop
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FishBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })

        }
    }

    OpenMenu = ( event ) => {
        this.setState({ ...this.state, menu: true, anchorEl: event.currentTarget })
    }

    render = () => {
        if ( this.props.CatchesToDrop.includes(this.props.catch_id) ) {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.catch_id].name } ||</Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.drop } </HackbarButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={ this.state.anchorEl }
                        keepMounted
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }
                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(1) }> { this.props.language.sell } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(3) }> { this.props.language.nothing } </MenuItem>
                    </Menu>
                </>
            )
        } else if ( this.props.CatchesToSell.includes(this.props.catch_id) ) {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.catch_id].name } ||</Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.sell } </HackbarButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={ this.state.anchorEl }
                        keepMounted
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }
                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(3) }> { this.props.language.nothing } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(2) }> { this.props.language.drop } </MenuItem>
                    </Menu>
                </>

            )
        } else {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.catch_id].name } || </Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.nothing }
                    </HackbarButton>
                    <Popover
                        id="simple-menu"
                        keepMounted
                        anchorEl={ this.state.anchorEl }
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }

                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(1) }> { this.props.language.sell } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(2) }> { this.props.language.drop } </MenuItem>
                    </Popover>

                </>
            )

        }

    }
}

class NewDeadFishListItem extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            menu: false,
            anchorEl: null
        }
    }

    CloseMenu = ( action_value ) => {
        if ( !action_value ) {
            this.setState({ ...this.state, menu: !this.state.menu })
        } else if ( action_value === 1 ) {
            this.OnDeadFishToGrillChange(this.props.fish_id)
        } else if ( action_value === 2 ) {
            this.OnDeadFishToDropChange(this.props.fish_id)
        } else if ( action_value === 3 ) {
            this.OnNothingChange(this.props.fish_id)
        }

    }

    OpenMenu = ( event ) => {
        this.setState({ ...this.state, menu: true, anchorEl: event.currentTarget })
    }

    render = () => {
        if ( this.props.DeadFishIdToDrop.includes(this.props.fish_id) ) {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.fish_id].name } ||</Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.drop } </HackbarButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={ this.state.anchorEl }
                        keepMounted
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }
                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(1) }> { this.props.language.grill } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(3) }> { this.props.language.nothing } </MenuItem>
                    </Menu>
                </>
            )
        } else if ( this.props.DeadFishIdToGrill.includes(this.props.fish_id) ) {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.fish_id].name } ||</Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.grill } </HackbarButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={ this.state.anchorEl }
                        keepMounted
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }
                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(3) }> { this.props.language.nothing } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(2) }> { this.props.language.drop } </MenuItem>
                    </Menu>
                </>

            )
        } else {
            return (
                <>
                    <Typography> { this.props.item_list[this.props.fish_id].name } || </Typography>
                    <HackbarButton onClick={ ( e ) => this.OpenMenu(e) }> { this.props.language.nothing }
                    </HackbarButton>
                    <Popover
                        id="simple-menu"
                        keepMounted
                        anchorEl={ this.state.anchorEl }
                        open={ Boolean(this.state.menu) }
                        onClose={ () => this.CloseMenu(0) }

                    >
                        <MenuItem disabled> { this.props.language.action } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(1) }> { this.props.language.grill } </MenuItem>
                        <MenuItem onClick={ () => this.CloseMenu(2) }> { this.props.language.drop } </MenuItem>
                    </Popover>

                </>
            )

        }

    }

    OnDeadFishToDropChange = ( fish_id ) => {
        this.CloseMenu(0)
        let new_fish_to_drop = this.props.fishbot.DeadFishIdToDrop
        let new_fish_to_grill = this.props.fishbot.DeadFishIdToGrill
        if ( new_fish_to_drop.includes(fish_id) ) {
            new_fish_to_drop = new_fish_to_drop.filter(( element ) => element !== fish_id)
        } else {
            new_fish_to_drop.push(fish_id)
            if ( new_fish_to_grill.includes(fish_id) ) {
                new_fish_to_grill = new_fish_to_grill.filter(element => ( element !== fish_id ))
            }
        }
        let _module = {
            DeadFishIdToGrill: new_fish_to_grill,
            DeadFishIdToDrop: new_fish_to_drop
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    OnDeadFishToGrillChange = ( fish_id ) => {
        this.CloseMenu(0)
        let new_fish_to_grill = this.props.DeadFishIdToGrill
        let new_fish_to_drop = this.props.DeadFishIdToDrop
        if ( new_fish_to_grill.includes(fish_id) ) {
            new_fish_to_grill = new_fish_to_grill.filter(( element ) => element !== fish_id)
        } else {
            new_fish_to_grill.push(fish_id)
            if ( new_fish_to_drop.includes(fish_id) ) {
                new_fish_to_drop = new_fish_to_drop.filter(( element ) => element !== fish_id)
            }
        }

        let _module = {
            DeadFishIdToDrop: new_fish_to_drop,
            DeadFishIdToGrill: new_fish_to_grill
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FishBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    OnNothingChange = ( fish_id ) => {
        this.CloseMenu(0)
        let new_catches_to_sell = this.props.DeadFishIdToGrill
        let new_catches_to_drop = this.props.DeadFishIdToDrop
        if ( new_catches_to_drop.includes(fish_id) ) {
            new_catches_to_drop = new_catches_to_drop.filter(( element ) => element !== fish_id)
        }
        if ( new_catches_to_sell.includes(fish_id) ) {
            new_catches_to_sell = new_catches_to_sell.filter(( element ) => element !== fish_id)
        }

        if ( new_catches_to_sell !== this.props.CatchesToSell || new_catches_to_drop !== this.props.CatchesToDrop ) {
            let _module = {
                DeadFishIdToGrill: new_catches_to_sell,
                DeadFishIdToDrop: new_catches_to_drop
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FishBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })

        }
    }

}

export default Fishbot