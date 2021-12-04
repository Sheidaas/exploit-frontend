import { Box, Grid, Tab, Table }      from "@material-ui/core";
import IconButton                     from "@material-ui/core/IconButton";
import PauseIcon                      from '@mui/icons-material/Pause';
import PlayCircleFilledIcon           from '@mui/icons-material/PlayCircleFilled';
import StopIcon                       from '@mui/icons-material/Stop';
import { grey, red }                  from '@mui/material/colors';
import React                          from "react";
import { HackbarAppBar, HackbarTabs } from "../../../components/hackbar_style/hackbar_style";
import store                          from "../../../store";
import { ACTIONS }                    from "../../../utils/enums";

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

class Shop extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            currentTab: 0,
            isSearching: false,
            interval: setInterval(() => {
                this.refreshShopResults()
            }, 500),
        }

        this.columns = [ "Name", "Company", "City", "State" ];

        this.data = [
            [ "Joe James", "Test Corp", "Yonkers", "NY" ],
            [ "John Walsh", "Test Corp", "Hartford", "CT" ],
            [ "Bob Herm", "Test Corp", "Tampa", "FL" ],
            [ "James Houston", "Test Corp", "Dallas", "TX" ],
        ];

        this.options = {
            filterType: 'checkbox',
        };
    }

    onChangeCurrentTab = ( e, new_tab ) => {
        this.setState({
            currentTab: new_tab
        })
    }

    refreshShopResults = () => {
        store.dispatch({
            type: ACTIONS.GET_SCANNED_SHOPS,
            client: this.props.socket,
            selected_client_id: store.getState().receivePacketsReducer.selected_client_id
        })
    }

    updateScanStatus = ( state ) => {
        let _module = {
            Enabled: state,
        }
        store.dispatch({
            type: ACTIONS.UPDATE_ONE_HACK_MODULE,
            client: this.props.socket,
            payload: { module_dict: _module, module_name: 'ShopSearcher' },
            index: store.getState().receivePacketsReducer.selected_client_id
        })

        if ( state === "Stopped" ) {
            store.dispatch({ type: "CLEAR_SCANNED_SHOPS" })
        }

    }

    render = () => {
        const listItems = <pre dangerouslySetInnerHTML={ {
            __html: JSON.stringify(this.props.scanned_shops, null, 2),
        } }/>

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <HackbarAppBar position="static" elevation={ 0 }>
                        <Grid item xs={ 12 }>
                            <HackbarTabs value={ this.state.currentTab }
                                         onChange={ ( e, new_value ) => this.onChangeCurrentTab(e, new_value) }
                                         variant="scrollable"
                                         scrollButtons="auto"
                                         aria-label="scrollable"
                            >
                                <Tab label={ 'Search' } { ...a11yProps } />
                                <Tab label={ 'Sell' } { ...a11yProps } />
                            </HackbarTabs>
                            <TabPanel value={ this.state.currentTab } index={ 0 }>
                                <Grid container xs={ 12 }>
                                    <Grid item>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td colSpan="2">Larry the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Grid>
                                </Grid>
                                <Grid container xs={ 12 }>
                                    <Grid item spacing={ 2 } columns={ { xs: 4, sm: 8, md: 12 } }>
                                        <IconButton onClick={ () => {
                                            this.state.isSearching = !this.state.isSearching;
                                            this.updateScanStatus(this.state.isSearching
                                                                  ? "Enabled"
                                                                  : "Paused")
                                        } }>
                                            { this.state.isSearching
                                              ? <PauseIcon sx={ { color: grey[400] } } fontSize="large"/>
                                              : <PlayCircleFilledIcon color="success" fontSize="large"/>
                                            }
                                        </IconButton>
                                        <IconButton>
                                            <StopIcon onClick={ () => {
                                                this.state.isSearching = false;
                                                this.updateScanStatus("Stopped")
                                            } }
                                                      sx={ { color: red[700] } } fontSize="large"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                { listItems }

                            </TabPanel>
                            <TabPanel value={ this.state.currentTab } index={ 1 }>
                                TODO: Impl. me
                            </TabPanel>
                        </Grid>
                    </HackbarAppBar>
                </Grid>
            </Grid>
        )
    }
}

export default Shop