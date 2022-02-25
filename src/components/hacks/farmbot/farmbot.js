import {
    Box,
    ButtonGroup,
    Checkbox,
    FormControlLabel,
    Grid,
    Input,
    ListItem,
    ListItemText,
    MenuItem,
    Tab,
    Typography
}                                          from '@material-ui/core'
import React                               from 'react'
import { FixedSizeList, shouldComponentUpdate }         from 'react-window'
import store                               from '../../../store'
import { SKILLS_ID }                       from "../../../utils/constants";
import { ACTIONS }                         from '../../../utils/enums.js'
import { getNiceLookingStringFromMapName } from '../../../utils/functions'
import {
    HackbarAppBar,
    HackbarButton,
    HackbarCheckbox,
    HackbarSelect,
    HackbarSlider,
    HackbarTabs
}                                          from '../../hackbar_style/hackbar_style.js'
import FileHandler                         from "../file_handler";
import SellerFilter                        from '../seller_filter';
import IconButton                     from "@material-ui/core/IconButton";
import PauseIcon                      from '@mui/icons-material/Pause';
import PlayCircleFilledIcon           from '@mui/icons-material/PlayCircleFilled';
import StopIcon                       from '@mui/icons-material/Stop';
import { grey, red }                  from '@mui/material/colors';
function a11yProps( index ) {
    return {
        id: `simple-tab-${ index }`,
        'aria-controls': `simple-tabpanel-${ index }`,
    };
}

function TabPanel( props ) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${ index }` }
            aria-labelledby={ `simple-tab-${ index }` }
            { ...other }
        >
            { value === index && (
                <Box p={ 2 }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

class Farmbot extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            currentTab: 0,
            ores: {
                20047: {
                    ore_id: 20047,
                    ore_item_id: 50601,
                    name: this.props.language.diamond,
                    enabled: false,
                },
                20048: {
                    ore_id: 20048,
                    ore_item_id: 50602,
                    name: this.props.language.amber,
                    enabled: false,
                },
                20049: {
                    ore_id: 20049,
                    ore_item_id: 50603,
                    name: this.props.language.fossil,
                    enabled: false,
                },
                20050: {
                    ore_id: 20050,
                    ore_item_id: 50604,
                    name: this.props.language.copper,
                    enabled: false,
                },
                20051: {
                    ore_id: 20051,
                    ore_item_id: 50605,
                    name: this.props.language.silver,
                    enabled: false,
                },
                20052: {
                    ore_id: 20052,
                    ore_item_id: 50606,
                    name: this.props.language.gold,
                    enabled: false,
                },
                20053: {
                    ore_item_id: 50606,
                    name: 'Jadeit',
                    enabled: false,
                },
                20054: {
                    ore_id: 20054,
                    ore_item_id: 50608,
                    name: this.props.language.ebonit,
                    enabled: false,
                },
                20055: {
                    ore_id: 20055,
                    ore_item_id: 50609,
                    name: this.props.language.clams,
                    enabled: false,
                },
                20056: {
                    ore_id: 20056,
                    ore_item_id: 50610,
                    name: this.props.language.white_gold,
                    enabled: false,
                },
                20057: {
                    ore_id: 20057,
                    ore_item_id: 50611,
                    name: this.props.language.crystal,
                    enabled: false,
                },
                20058: {
                    ore_id: 20058,
                    ore_item_id: 50612,
                    name: this.props.language.amethyst,
                    enabled: false,
                },
                20059: {
                    ore_id: 20059,
                    ore_item_id: 50613,
                    name: this.props.language.heavens_tears,
                    enabled: false,
                },
                30301: {
                    ore_id: 30301,
                    ore_item_id: 50634,
                    name: this.props.language.soul_crystal,
                    enabled: false,
                },
                30302: {
                    ore_id: 30302,
                    ore_item_id: 50635,
                    name: this.props.language.ruby,
                    enabled: false,
                },
                30303: {
                    ore_id: 30303,
                    ore_item_id: 50636,
                    name: this.props.language.garnet,
                    enabled: false,
                },
                30304: {
                    ore_id: 30304,
                    ore_item_id: 50637,
                    name: this.props.language.emerald,
                    enabled: false,
                },
                30305: {
                    ore_id: 30305,
                    ore_item_id: 50638,
                    name: this.props.language.sapphire,
                    enabled: false,
                },
                30306: {
                    ore_id: 30306,
                    ore_item_id: 50639,
                    name: this.props.language.tourmaline,
                    enabled: false,
                }

            },
            show_only_checked_mobs: false,
            show_only_unchecked_mobs: false,
            
            mobs_to_kill_to_show: {},
            mobs_to_kill_to_avoid: {},

        }
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
    }

    onPointDelete = ( index ) => {
        let _module = {
            Path: this.props.farmbot.Path.filter(( item ) => item !== this.props.farmbot.Path[index]),
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    render_all_waypoints = ( props ) => {
        const { index, style } = props;
        return (
            <div className='waypoint'>
                <ListItem button key={ index } style={ style } onClick={ () => {
                    this.onPointDelete(index)
                } }>
                    <ListItemText
                        primary={ `[${ index + 1 }] ${ Math.round(this.props.farmbot.Path[index][0] / 100) }:${ Math.round(this.props.farmbot.Path[index][1] / 100) } ${ getNiceLookingStringFromMapName(this.props.farmbot.Path[index][2]) }` }/>
                </ListItem>
            </div>
        )
    }

    render_mobs_list = (props) => {
        const { index, style } = props;
        let mob_id = Object.keys(this.props.mobs_data)[index]
        let mob = this.props.mobs_data[mob_id]

        let checked = false
        if ( this.props.farmbot.MobsToKill.includes(parseInt(mob_id)) ) {
            checked = true
        }
        return (
            <div className='item'>
                <ListItem button key={ index } style={ style }>
                    <FormControlLabel control={ <HackbarCheckbox checked={ checked }
                                                                 onChange={ () => {this.onCheckMobToKill(parseInt(mob_id))} }
                                                                 name="mine" /> } label={ mob.name }/>
                </ListItem>
            </div>
        )
    }

    onCheckMobToKill = (mob_id) => {
        if ( this.props.farmbot.MobsToKill.includes(mob_id) ) {
            let _module = {
                MobsToKill: this.props.farmbot.MobsToKill.filter(( item ) => item !== mob_id)
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FarmBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
            this.forceUpdate()
        } else {
            let MobsToKill = this.props.farmbot.MobsToKill
            MobsToKill.push(mob_id)
            let _module = {
                MobsToKill: MobsToKill
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FarmBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
            this.forceUpdate()
        }
    }

    SwitchLookForOre = () => {
        console.log('??')
        let _module = {
            LookForOre: !this.props.farmbot.LookForOre,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchMoveToItems = () => {
        let _module = {
            LookForItems: !this.props.farmbot.LookForItems,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchLookForMetins = () => {
        let _module = {
            LookForMetins: !this.props.farmbot.LookForMetins,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchLookForBosses = () => {
        let _module = {
            LookForBosses: !this.props.farmbot.LookForBosses,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchExchangeItemsToEnergy = () => {
        let _module = {
            ExchangeItemsToEnergy: !this.props.farmbot.ExchangeItemsToEnergy,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchChangeChannel = () => {
        let _module = {
            ChangeChannels: !this.props.farmbot.ChangeChannels,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchEnabled = (new_state) => {
        let _module = {
            Enabled: new_state
        }
        console.log(_module)
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    SwitchKillMobs = () => {
        let _module = {
            LookForMobs: !this.props.farmbot.LookForMobs
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    SwitchCanGoBuyPotions = () => {
        let _module = {
            CanGoBuyPotions: !this.props.farmbot.CanGoBuyPotions
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    SwitchCanGoSellItems = () => {
        let _module = {
            CanGoSellItems: !this.props.farmbot.CanGoSellItems
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    OnChangeSelectOre = ( ore_id ) => {
        let ores = this.state.ores
        let ore = this.state.ores[ore_id]
        ore.enabled = !ore.enabled
        ores[ore_id] = ore
        this.setState({ ores: ores })
        if ( this.props.farmbot.OresToMine.includes(parseInt(ore_id)) ) {
            let _module = {
                OresToMine: this.props.farmbot.OresToMine.filter(( item ) => item !== parseInt(ore_id))
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FarmBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else {
            let new_ores_to_mine = this.props.farmbot.OresToMine
            new_ores_to_mine.push(parseInt(ore_id))
            let _module = {
                OresToMine: new_ores_to_mine
            }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FarmBot' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }
    }

    onChangeCurrentTab = ( e, new_tab ) => {
        this.setState({
            currentTab: new_tab
        })
    }

    componentDidMount = () => {
        console.log(this.props.farmbot)
        this.props.farmbot.MobsToKill.map( selected_mob => {
            let mob_key = Object.keys(this.props.mobs_data)[selected_mob]
            console.log(this.props.mobs_data[mob_key])
        })
        let ores = this.state.ores
        this.props.farmbot.OresToMine.map(( _ore_id ) => {
            let ore = this.state.ores[_ore_id]
            ore.enabled = true
            ores[_ore_id] = ore
        })
        this.setState({ ores: ores })
    }

    onClearButton = () => {
        let _module = {
            ClearPath: true,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

    }
    onChangeWaitingTime = ( event, new_value ) => {
        let _module = {
            WaitingTime: new_value
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    onChangeMaxRangeToMob = ( event, new_value ) => {
        let _module = {
            MaxRangeToMob: new_value * 10
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }
    onChangeSkillBookIds = ( skill_id ) => {
        let _module = {}
        let new_skill_book_ids = this.props.farmbot.SkillBookIds
        if ( new_skill_book_ids.includes(skill_id) ) {
            _module = {
                SkillBookIds: new_skill_book_ids.filter(element => element !== skill_id)
            }
        } else {
            new_skill_book_ids.push(skill_id)
            _module = {
                SkillBookIds: new_skill_book_ids
            }
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    clearMobList = () => {
        let _module = {
            MobsToKill: []
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'FarmBot' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })
        this.forceUpdate()
    }

    render = () => {
    return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <HackbarAppBar position="static" elevation={ 0 }>
                        <Grid item xs={ 12 }>
                            <HackbarTabs value={ this.state.currentTab }
                                         onChange={ ( e, new_value ) => this.onChangeCurrentTab(e, new_value)
                                         }
                                         variant="scrollable"
                                         scrollButtons="auto"
                                         aria-label="scrollable"
                            >
                                <Tab label={ 'General' } { ...a11yProps } />
                                <Tab label={ 'Mobs' } { ...a11yProps } />
                                <Tab label={ 'Shop' } { ...a11yProps } />
                            </HackbarTabs>
                            <TabPanel value={ this.state.currentTab } index={ 0 }>
                                <Typography> { this.props.language.waypoints } </Typography>
                                <Typography
                                    className='small-going-to-point'> { this.props.language.going_to_point } { this.props.farmbot.CurrentPoint + 1 } </Typography>
                                <FixedSizeList height={ 200 } width={ '100%' } itemSize={ 46 }
                                               itemCount={ this.props.farmbot.Path.length }>
                                    { this.render_all_waypoints }
                                </FixedSizeList>
                                <Grid item xs={ 12 }>
                                    <Grid container>
                                        <Grid item x={12} >
                                            <IconButton onClick={() => this.SwitchEnabled( this.props.farmbot.Enabled==='ENABLED'
                                                                                        ? 'PAUSED'
                                                                                        : 'ENABLED')}>

                                                {
                                                    this.props.farmbot.Enabled==='ENABLED'
                                                    ? <PauseIcon sx={ { color: grey[400] } } fontSize="large"/>
                                                    : <PlayCircleFilledIcon color="success" fontSize="large"/>
                                                }
                                            </IconButton>
                                            <IconButton onClick={ () => this.SwitchEnabled( 'STOPPED' )}>
                                                <StopIcon sx={ { color: red[700] } } fontSize="large"/>
                                            </IconButton>
                                        </Grid>
                                        <ButtonGroup>
                                            <HackbarButton onClick={ () => this.onClearButton() }
                                                           primary> { this.props.language.clear_path } </HackbarButton>
                                        </ButtonGroup>
                                    </Grid>
                                    <Grid container>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.LookForOre }
                                                                       onChange={ () => this.SwitchLookForOre() }
                                                                       name="mine"/> }
                                            label={ this.props.language.label_look_for_ores }/>
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.LookForMetins }
                                                                       onChange={ () => this.SwitchLookForMetins() }
                                                                       name="mine"/> }
                                            label={ this.props.language.label_look_for_metins }/>
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.LookForBosses }
                                                                       onChange={ () => this.SwitchLookForBosses() }
                                                                       name="mine"/> }
                                            label={ this.props.language.label_look_for_bosses }/>
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.LookForMobs }
                                                                       onChange={ () => this.SwitchKillMobs() }
                                                                       name="mine"/> }
                                            label={ this.props.language.label_look_for_mobs }/>
                                    </Grid>
                                    
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        { this.props.farmbot.LookForOre && <HackbarSelect
                                            multiple
                                            fullWidth={ true }
                                            value={ Object.entries(this.state.ores).map(( [ key, _value ] ) => {
                                                return _value.name
                                            }) }
                                            input={ <Input/> }
                                            renderValue={ ( selected ) => this.props.language.ores_to_mine }
                                        >
                                            { Object.entries(this.state.ores).map(( [ key, _value ] ) => {
                                                //onChange={(e) => this.OnChangeSelectOre(e.target.value)}
                                                return (
                                                    <MenuItem key={ key } value={ key }>
                                                        <Checkbox checked={ _value.enabled } value={ key }
                                                                  onChange={ ( e ) => this.OnChangeSelectOre(parseInt(e.target.value)) }/>
                                                        <ListItemText primary={ _value.name.toString() }/>
                                                    </MenuItem>
                                                )
                                            }) }
                                        </HackbarSelect> }
                                    </Grid>
                                    <Grid container>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.ChangeChannels }
                                                                       onChange={ () => this.SwitchChangeChannel() }
                                                                       name="mine"/> }
                                            label={ this.props.language.change_channel }/>
                                    
                                    
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <FormControlLabel
                                            control={ <HackbarCheckbox checked={ this.props.farmbot.LookForItems }
                                                                       onChange={ () => this.SwitchMoveToItems() }
                                                                       name="mine"/> }
                                            label={ this.props.language.label_look_for_items }/>
                                    
                                    
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <Typography> { this.props.language.waiting_time } </Typography>
                                        <HackbarSlider value={ this.props.farmbot.WaitingTime } min={ 1 } max={ 10 }
                                                       marks={ true }
                                                       valueLabelDisplay={ true }
                                                       onChange={ this.onChangeWaitingTime }/>
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <Typography> { this.props.language.label_max_range_to_moob } </Typography>
                                        <HackbarSlider value={ this.props.farmbot.MaxRangeToMob / 10 } min={ 100 } max={ 2000 }
                                                       valueLabelDisplay={ true }
                                                       onChange={ this.onChangeMaxRangeToMob }/>
                                    </Grid>
                                    </Grid>

                                    <Grid item xs={ 12 }>
                                        <FileHandler socket={ this.props.socket } farmbot_path
                                                     language={ this.props.file_handler_language }/>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={ this.state.currentTab } index={ 1 }>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <FixedSizeList height={ 400 } width={ '100%' } itemSize={ 56 }
                                                    itemCount={ Object.keys(this.props.mobs_data).length }
                                                    onChange={ () => this.shouldComponentUpdate() }>
                                            { this.render_mobs_list }
                                        </FixedSizeList>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <HackbarButton onClick={ () => this.clearMobList() }> {this.props.language.label_delete_all_mobs} </HackbarButton>
                                    </Grid>
                                </Grid>

                            </TabPanel>
                            <TabPanel value={ this.state.currentTab } index={ 2 }>
                                <Grid container>
                                    <Grid container>
                                        <Grid item xs={ 6 }>
                                            <FormControlLabel
                                                control={ <HackbarCheckbox checked={ this.props.farmbot.CanGoBuyPotions }
                                                                        onChange={ () => this.SwitchCanGoBuyPotions() }
                                                                        name="mine"/> }
                                                label={ this.props.language.label_buy_potions }/>
                                        </Grid>
                                        <Grid item xs={ 6 }>
                                            <FormControlLabel
                                                control={ <HackbarCheckbox checked={ this.props.farmbot.CanGoSellItems }
                                                                        onChange={ () => this.SwitchCanGoSellItems() }
                                                                        name="mine"/> }
                                                label={ this.props.language.label_go_sell_items }/>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={ 12 }>
                                        <Typography> {this.props.language.label_select_books} </Typography>
                                        <HackbarSelect
                                            value={ SKILLS_ID.map(element => {return ( 'Select books to sell ' )}) }
                                            multiple
                                            fullWidth={ true }
                                            input={ <Input/> }>
                                            {
                                                SKILLS_ID.map(element => {
                                                    return (
                                                        <MenuItem value={ element }>
                                                            <Checkbox
                                                                checked={ this.props.farmbot.SkillBookIds.includes(element) }
                                                                value={ element }
                                                                onChange={ () => this.onChangeSkillBookIds(element) }/>
                                                            <ListItemText
                                                                primary={ this.props.skill_list[element].name }/>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </HackbarSelect>
                                    </Grid>
                                    <Grid item xs={ 12 }>
                                        <SellerFilter socket={ this.props.socket }
                                                      item_list={ this.props.item_list }
                                                      pickup_filter={ this.props.farmbot.ItemsToSell }
                                                      language={ this.props.pickup_filter_lanuguage }
                                                      pickup_filter_lanuguage={ this.props.pickup_filter_lanuguage }
                                                      file_handler_language={ this.props.file_handler_language }
                                                      icon_names={ this.props.icon_names } item_types={this.props.item_types} item_data={this.props.item_data}/>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </HackbarAppBar>
                </Grid>
            </Grid>
        )
    }
}

export default Farmbot