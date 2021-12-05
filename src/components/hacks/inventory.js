import {
    ButtonGroup,
    FormControlLabel,
    Grid,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
}                                               from '@material-ui/core';
import React                                    from 'react'
import { connect }                              from 'react-redux'
import { FixedSizeList, shouldComponentUpdate } from 'react-window'
import store                                    from '../../store'
import { ACTIONS }                              from '../../utils/enums.js'
import { parseMoney }                           from '../../utils/functions'
import { HackbarButton, HackbarCheckbox }       from '../hackbar_style/hackbar_style.js'

class InventoryList extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            upgrade_menu: 0,
            selected_items: [],
            interval: setInterval(() => {
                this.getInventoryStatus()
            }, 250),
        }
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
    }

    getInventoryStatus = () => {
        let index = store.getState().receivePacketsReducer.selected_client_id
        store.dispatch({ type: ACTIONS.GET_INVENTORY_STATUS, client: this.props.socket, index: index })
    }

    componentWillUnmount = () => {
        clearInterval(this.state.interval);
    }

    onItemCheckboxChange = ( _id ) => {
        let new_items = this.state.selected_items
        if ( new_items.includes(_id) ) {
            new_items = new_items.filter(( element ) => element !== _id)
        } else {
            new_items.push(_id)
        }

        this.setState({
            selected_items: new_items
        })
        this.forceUpdate()
    }

    render_inventory = ( props ) => {
        const { index, style } = props;
        let item = this.props.item_list[this.props.inventory[index].id]
        let _label = ''
        if ( this.props.inventory[index].count > 1 ) {
            _label = item.name + ' (' + this.props.inventory[index].count + ' pieces)'
        } else {
            _label = item.name
        }
        let checked = false
        if ( this.state.selected_items.includes(this.props.inventory[index].slot) ) {
            checked = true
        }
        let arr = [ 50300, 70037, 70055 ]
        if ( arr.includes(this.props.inventory[index].id) ) {
            _label = item.name + ' ' + this.props.skill_list[this.props.inventory[index].book_name].name
        }
        arr = [ 70104, 71093 ]
        if ( arr.includes(this.props.inventory[index].id) ) {
            console.log(this.props.inventory[index])
            _label = item.name + ' ' + this.props.mob_names[this.props.inventory[index].book_name].name
        }
        return (
            <div className='item'>
                <ListItem button key={ index } style={ style }>
                    <img src={ 'https://metin2cms.cf/items/img/icons/' + this.props.icon_names[this.props.inventory[index].id].name + '.png' }/>
                    <FormControlLabel control={ <HackbarCheckbox checked={ checked } name="mine"
                                                                 onChange={ () => this.onItemCheckboxChange(this.props.inventory[index].slot) }/> }
                                      label={ _label }/>
                </ListItem>
            </div>
        )
    }
    render_equpiment = ( props ) => {
        const { index, style } = props;
        let keys = Object.keys(this.props.equipment)
        let item = this.props.equipment[keys[index]]
        if ( item.id ) {
            return (
                <div className='item'>
                    <ListItem style={ style } button key={ index }
                              onClick={ () => this.onClickItemInEquipment(keys[index]) }>
                        <img src={ 'https://metin2cms.cf/items/img/icons/' + this.props.icon_names[item.id].name + '.png' }/>
                        <ListItemText
                            primary={ this.props.language[keys[index]] + ': ' + this.props.item_list[item.id].name }/>
                    </ListItem>
                </div>
            )
        } else {
            return (
                <div className='item'>
                    <ListItem style={ style } button key={ index } onClick={ () => {} }>
                        <ListItemText primary={ this.props.language[keys[index]] + ': ' + this.props.language.empty }/>
                    </ListItem>
                </div>
            )
        }
    }

    onClickItemInEquipment = ( key ) => {
        let _module = {
            action: 'use_item_on_equipment',
            items_list: [ key ],
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'Inventory' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }

    OpenUpgradeMenu = ( e ) => {
        this.setState({
            ...this.state,
            upgrade_menu: e.currentTarget,
        })
    }
    CloseUpgradeMenu = ( number ) => {
        this.setState({
            ...this.state,
            upgrade_menu: 0,
        })
        if ( !number ) {

        } else {
            let _module = {
                action: 'upgrade_items',
                items_list: this.state.selected_items,
                number_to_upgrade: number,
                mode: 0,
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'Inventory' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
            this.setState({ ...this.state, selected_items: [] })
        }
    }

    SellAllItems = () => {
        let _module = {
            action: 'sell_all_items',
            items_list: this.state.selected_items,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'Inventory' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
        this.setState({ ...this.state, selected_items: [] })
    }

    DropAllItems = () => {
        let _module = {
            action: 'drop_all_items',
            items_list: this.state.selected_items,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'Inventory' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
        this.setState({ ...this.state, selected_items: [] })
    }

    UseSelectedItms = () => {
        let _module = {
            action: 'use_all_items',
            items_list: this.state.selected_items,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'Inventory' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
        this.setState({ ...this.state, selected_items: [] })
    }
    render = () => {
        console.log(this.props)
        let is_rendering_inventory = <> </>
        if ( this.props.inventory.length ) {
            is_rendering_inventory = <>
                <FixedSizeList height={ 350 } width={ '100%' } itemSize={ 50 } itemCount={ this.props.inventory.length }
                               onChange={ () => this.shouldComponentUpdate() }>
                    { this.render_inventory }
                </FixedSizeList>
            </>
        }
        let is_rendering_equipment = <> </>
        if ( Object.keys(this.props.equipment).length ) {
            is_rendering_equipment = <>
                <FixedSizeList height={ 200 } width={ '100%' } itemSize={ 60 }
                               itemCount={ Object.keys(this.props.equipment).length }
                               onChange={ () => this.shouldComponentUpdate() }>
                    { this.render_equpiment }
                </FixedSizeList>
            </>
        }
        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <Typography
                        style={ { textAlign: 'center' } }> { this.props.language.header_equipment } </Typography>
                    { is_rendering_equipment }
                </Grid>


                <Grid item xs={ 12 }>
                    <Typography
                        style={ { textAlign: 'center' } }> { this.props.language.header_inventory } </Typography>
                    <Typography
                        style={ { textAlign: 'center' } }> { this.props.language.current_money } { parseMoney(this.props.character_status.Money) }</Typography>
                    <Typography
                        style={ { textAlign: 'center' } }> { this.props.language.label_space } { this.props.inventory_max_slots - this.props.inventory_free_slots } / { this.props.inventory_max_slots }</Typography>
                    { is_rendering_inventory }
                </Grid>
                <Grid item xs={ 12 }>
                    <ButtonGroup>
                        <HackbarButton onClick={ ( e ) => this.OpenUpgradeMenu(e) }>
                            { this.props.language.upgrade_selected }
                        </HackbarButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={ this.state.upgrade_menu }
                            keepMounted
                            open={ Boolean(this.state.upgrade_menu) }
                            onClose={ () => this.CloseUpgradeMenu(0) }
                        >
                            <MenuItem disabled> { this.props.language.number_of_upgrades } </MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(1) }>1</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(2) }>2</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(3) }>3</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(4) }>4</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(5) }>5</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(6) }>6</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(7) }>7</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(8) }>8</MenuItem>
                            <MenuItem onClick={ () => this.CloseUpgradeMenu(9) }>9</MenuItem>
                        </Menu>
                        <HackbarButton onClick={ () => this.SellAllItems() }>
                            { this.props.language.sell_selected }
                        </HackbarButton>

                    </ButtonGroup>
                </Grid>
                <Grid item xs={ 12 }>
                    <ButtonGroup>

                        <HackbarButton onClick={ () => this.DropAllItems() }>
                            { this.props.language.drop_selected }
                        </HackbarButton>
                        <HackbarButton onClick={ () => this.UseSelectedItms() }>
                            { this.props.language.use_selected }
                        </HackbarButton>
                    </ButtonGroup>
                </Grid>

            </Grid>

        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        inventory_free_slots: state.receivePacketsReducer.inventory_free_slots,
        inventory_max_slots: state.receivePacketsReducer.inventory_max_slots,
        equipment: state.receivePacketsReducer.equipment,
        inventory: state.receivePacketsReducer.inventory,
        item_list: state.receivePacketsReducer.server_info.Items,
        skill_list: state.receivePacketsReducer.server_info.Skills,
        icon_names: state.receivePacketsReducer.server_info.ItemIcons,
        mob_names: state.receivePacketsReducer.server_info.Mobs,
    }
}

export default connect(mapStateToProps)(InventoryList)