import { Grid, Paper } from '@material-ui/core'
import React           from 'react'
import './desc.css'

class Description extends React.Component {

    render() {
        return (
            <Grid item xs={ 10 } md={ 2 } className='container-desc'>
                <Paper className='desc-info' variant='outlined' square>
                    <Grid item>
                        <div className='desc-info-header'>
                            { this.props.language.why_worth }
                        </div>
                        <div className='desc-info-option'>
                            { this.props.language.option_one }
                        </div>
                        <div className='desc-info-option'>
                            { this.props.language.option_two }
                        </div>
                    </Grid>
                </Paper>
            </Grid>

        );
    }
}

export default Description