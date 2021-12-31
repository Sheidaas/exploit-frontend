import { ButtonGroup, Grid, MenuItem, Typography }        from '@material-ui/core'
import React                                              from 'react'
import { connect }                                        from 'react-redux'
import store                                              from "../../store";
import { ACTIONS }                                        from "../../utils/enums";
import { HackbarButton, HackbarSelect, HackbarTextField } from '../hackbar_style/hackbar_style.js'
import './file_handler.css'

class FileHandler extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            new_file_name: '',
            current_file: this.props.language.choose_file_to_load_none,
        }
    }

    onNewFileNameChange = ( new_value ) => {
        this.setState({ ...this.state, new_file_name: new_value })
    }

    onChangeCurrentFile = ( new_value ) => {
        this.setState({ ...this.state, current_file: new_value })
        if ( new_value === this.props.language.choose_file_to_load_none ) {

        }
    }

    onDeleteFile = ( filename_to_delete ) => {
        if ( filename_to_delete === this.props.language.choose_file_to_load_none ) {
            return
        }

        if ( this.props.pickup_filter ) {
            let _module = { DeletePickupList: filename_to_delete }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.other_settings ) {
            let _module = { DeleteOtherSettings: filename_to_delete }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.farmbot_path ) {
            let _module = { DeleteFarmbotPath: filename_to_delete }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }

        if ( filename_to_delete === this.state.current_file ) {
            this.setState({ ...this.state, current_file: this.props.language.choose_file_to_load_none })

        }
    }

    onLoadFile = ( filename_to_load ) => {
        if ( filename_to_load === this.props.language.choose_file_to_load_none ) {
            return
        }
        if ( this.props.pickup_filter ) {
            let _module = { LoadPickupList: filename_to_load }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.other_settings ) {
            let _module = { LoadOtherSettings: filename_to_load }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.farmbot_path ) {
            let _module = { LoadFarmbotPath: filename_to_load }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }
    }

    onSaveFile = ( filename_to_save ) => {
        if ( filename_to_save === this.props.language.choose_file_to_load_none ) {
            return
        }
        if ( this.props.pickup_filter ) {
            let _module = { SavePickupList: filename_to_save }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.other_settings ) {
            let _module = { SaveOtherSettings: filename_to_save }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.farmbot_path ) {
            let _module = { SaveFarmbotPath: filename_to_save }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }
    }

    onRescan = () => {
        if ( this.props.pickup_filter ) {
            let _module = { RescanPickupList: '' }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.other_settings ) {
            let _module = { RescanOtherSettings: '' }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        } else if ( this.props.farmbot_path ) {
            let _module = { RescanFarmbotPath: '' }
            store.dispatch({
                type: ACTIONS.UPDATE_ONE_HACK_MODULE,
                client: this.props.socket,
                payload: { module_dict: _module, module_name: 'FileHandler' },
                index: store.getState().receivePacketsReducer.selected_client_id
            })
        }
    }

    render = () => {

        if ( this.props.pickup_filter ) {
            return (
                <Grid container>
                    <Grid item xs={ 12 } className={ 'file-handler-header' }/>
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <Typography> { this.props.language.pickup_filter_header_text } </Typography>

                        </Grid>
                        <Grid item xs={ 6 }>
                            <HackbarTextField type={ 'text' } value={ this.state.new_file_name }
                                              placeholder={ this.props.language.new_file_name_placeholder }
                                              helperText={ this.props.language.new_file_name_helper_text }
                                              onChange={ e => this.onNewFileNameChange(e.target.value) }
                                              onKeyDown={ e => e.stopPropagation() }
                                              fullWidth/>
                        </Grid>
                        <Grid item xs={ 6 } className={ 'centered-text' }>
                            <ButtonGroup>
                                <HackbarButton
                                    onClick={ () => this.onSaveFile(this.state.new_file_name) }> { this.props.language.save } </HackbarButton>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>

                        <HackbarSelect
                            fullWidth
                            value={ this.state.current_file }
                            onChange={ ( e ) => this.onChangeCurrentFile(e.target.value) }
                        >
                            <MenuItem
                                value={ this.props.language.choose_file_to_load_none }> { this.props.language.choose_file_to_load_none } </MenuItem>
                            {
                                this.props.FileHandler.PickupLists.map(element => {
                                    return <MenuItem value={ element }> { element } </MenuItem>
                                }) }
                        </HackbarSelect>
                        <ButtonGroup className={ 'button-group' }>
                            <HackbarButton onClick={ () => this.onSaveFile(this.state.current_file) }>
                                { this.props.language.save_to_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onLoadFile(this.state.current_file) }>
                                { this.props.language.load_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onDeleteFile(this.state.current_file) }>
                                { this.props.language.delete_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onRescan() }>
                                { this.props.language.rescan_files }
                            </HackbarButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )
        } else if ( this.props.other_settings ) {
            return (
                <Grid container>
                    <Grid item xs={ 12 } className={ 'file-handler-header' }/>
                    <Grid container>
                        <Typography> { this.props.language.other_settings_header_text } </Typography>
                        <Grid item xs={ 6 }>
                            <HackbarTextField type={ 'text' } value={ this.state.new_file_name }
                                              placeholder={ this.props.language.new_file_name_placeholder }
                                              helperText={ this.props.language.new_file_name_helper_text }
                                              onChange={ e => this.onNewFileNameChange(e.target.value) }
                                              onKeyDown={ e => e.stopPropagation() }
                                              fullWidth/>
                        </Grid>
                        <Grid item xs={ 6 } className={ 'centered-text' }>
                            <ButtonGroup>
                                <HackbarButton
                                    onClick={ () => this.onSaveFile(this.state.new_file_name) }> { this.props.language.save } </HackbarButton>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>

                        <HackbarSelect
                            fullWidth
                            value={ this.state.current_file }
                            onChange={ ( e ) => this.onChangeCurrentFile(e.target.value) }
                        >
                            <MenuItem
                                value={ this.props.language.choose_file_to_load_none }> { this.props.language.choose_file_to_load_none } </MenuItem>
                            {
                                this.props.FileHandler.OtherSettings.map(element => {
                                    return <MenuItem value={ element }> { element } </MenuItem>
                                }) }
                        </HackbarSelect>
                        <ButtonGroup className={ 'button-group' }>
                            <HackbarButton onClick={ () => this.onSaveFile(this.state.current_file) }>
                                { this.props.language.save_to_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onLoadFile(this.state.current_file) }>
                                { this.props.language.load_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onDeleteFile(this.state.current_file) }>
                                { this.props.language.delete_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onRescan() }>
                                { this.props.language.rescan_files }
                            </HackbarButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )
        } else if ( this.props.farmbot_path ) {
            return (
                <Grid container>
                    <Grid item xs={ 12 } className={ 'file-handler-header' }/>
                    <Grid container>
                        <Typography> { this.props.language.farmbot_path_header_text } </Typography>
                        <Grid item xs={ 6 }>
                            <HackbarTextField type={ 'text' } value={ this.state.new_file_name }
                                              placeholder={ this.props.language.new_file_name_placeholder }
                                              helperText={ this.props.language.new_file_name_helper_text }
                                              onChange={ e => this.onNewFileNameChange(e.target.value) }
                                              onKeyDown={ e => e.stopPropagation() }
                                              fullWidth/>
                        </Grid>
                        <Grid item xs={ 6 } className={ 'centered-text' }>
                            <ButtonGroup>
                                <HackbarButton
                                    onClick={ () => this.onSaveFile(this.state.new_file_name) }> { this.props.language.save } </HackbarButton>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={ 12 }>

                        <HackbarSelect
                            fullWidth
                            value={ this.state.current_file }
                            onChange={ ( e ) => this.onChangeCurrentFile(e.target.value) }
                        >
                            <MenuItem
                                value={ this.props.language.choose_file_to_load_none }> { this.props.language.choose_file_to_load_none } </MenuItem>
                            {
                                this.props.FileHandler.FarmbotPaths.map(element => {
                                    return <MenuItem value={ element }> { element } </MenuItem>
                                }) }
                        </HackbarSelect>
                        <ButtonGroup className={ 'button-group' }>
                            <HackbarButton onClick={ () => this.onSaveFile(this.state.current_file) }>
                                { this.props.language.save_to_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onLoadFile(this.state.current_file) }>
                                { this.props.language.load_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onDeleteFile(this.state.current_file) }>
                                { this.props.language.delete_file }
                            </HackbarButton>
                            <HackbarButton onClick={ () => this.onRescan() }>
                                { this.props.language.rescan_files }
                            </HackbarButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    return {
        FileHandler: state.receivePacketsReducer.hack_status.FileHandler
    }
}

export default connect(mapStateToProps)(FileHandler)





