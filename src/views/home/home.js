import { Grid, Paper, Typography } from '@material-ui/core';
import React                       from 'react'
import './home.css'

class Home extends React.Component {
    render() {
        return (
            <Grid container id='container' maxWidth='Fluid'>
                <Grid container xs={ 12 } className="stages" justifyContent='center'>
                    <Paper className={ 'description' }>
                        <Grid item xs={ 12 } className={ 'grid-description' }>
                            <Typography id='big-title'> { this.props.language.open_bot_title } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.open_bot_description } </Typography>
                        </Grid>


                        <Grid item xs={ 12 } className={ 'grid-description' }>
                            <Typography id='big-title'> { this.props.language.authors_title } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'>{ this.props.language.authors_description_1 } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.authors_description_2 } </Typography>
                        </Grid>
                        <Grid item xs={ 12 } className={ 'grid-description' }>
                            <Typography id='big-title'> { this.props.language.translations_title } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.translations_description_1 } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.translations_description_2 } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.translations_description_3 } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'> { this.props.language.translations_description_4 } </Typography>
                        </Grid>
                        <Grid item xs={ 12 } className={ 'grid-description' }>
                            <Typography id='big-title'> { this.props.language.constact_us_title } </Typography>
                            <Typography variation='p'
                                        id='big-title-description'>{ this.props.language.constact_us_description_1 }</Typography>
                            <Typography variation='p' id='big-title-description'> <a
                                href={ 'https://discord.gg/RNKGtnsH8T' }> { this.props.language.constact_us_description_2 } </a>
                            </Typography>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}

export default Home