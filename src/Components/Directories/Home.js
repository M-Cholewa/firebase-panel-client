import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import ChipInput from 'material-ui-chip-input'
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    details: {
        flexDirection: "column"
    },
    input: {
        display: 'none',
    },
})
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        const { classes } = this.props

        return (
            <div>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
                {/* <Paper className={classes.paper} elevation={1}> */}


                <ExpansionPanel square={false}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >

                        <IconButton
                            aria-label="Usuń zadanie" className={classes.iconButton}
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}>
                            <DeleteIcon style={{
                                color: red[500]
                            }} />
                        </IconButton>

                        <FormControlLabel
                            className={classes.iconButton}
                            aria-label="Acknowledge"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={<Checkbox />}
                            label="I acknowledge that I should stop the click event propagation"
                        />

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        "czyWymagane"
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel ref={"inputLabel"} id="czyWymagane">
                                czyWymagane
                            </InputLabel>
                            <Select
                                required
                                labelId="czyWymagane"
                                id="demo-simple-select-outlined"
                                value={true}
                            // onChange={handleChange}
                            // labelWidth={labelWidth}
                            >
                                <MenuItem value={true}>Tak</MenuItem>
                                <MenuItem value={false}>Nie</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        "dobreOdpowiedzi"<br />
                        <ChipInput
                            id="dobreOdpowiedzi"
                            // value={0.5}
                            variant="outlined"
                            label="dobreOdpowiedzi"
                            style={{ margin: 8 }}
                            type="number"
                            variant="outlined"
                            required
                            defaultValue={['foo', 'bar']}
                        />

                        "lokalizacjaDl"<br />
                        <TextField
                            id="lokalizacjaDl"
                            // value={0.5}
                            variant="outlined"
                            label="lokalizacjaDl"
                            style={{ margin: 8 }}
                            type="number"
                            required
                            margin="normal"
                        />
                        "lokalizacjaSzer"<br />
                        <TextField
                            id="lokalizacjaSzer"
                            // value={"123123"}
                            variant="outlined"
                            label="lokalizacjaSzer"
                            style={{ margin: 8 }}
                            type="number"
                            required
                            margin="normal"
                        />
                        "podpisObrazka"<br />
                        <TextField
                            id="podpisObrazka"
                            // value={"podpisObrazka"}
                            variant="outlined"
                            label="podpisObrazka"
                            style={{ margin: 8 }}
                            margin="normal"
                        />

                        "podtytul"<br />
                        <TextField
                            id="podtytul"
                            // value={"podtytul"}
                            variant="outlined"
                            label="podtytul"
                            style={{ margin: 8 }}
                            margin="normal"
                        />
                        "trescZadania"<br />
                        <TextField
                            id="trescZadania"
                            // value={"trescZadania"}
                            variant="outlined"
                            label="trescZadania"
                            required
                            style={{ margin: 8 }}
                            margin="normal"
                        />
                        "tytul"
                            <TextField
                            id="tytul"
                            // value={["rozbiory", "twoja stara", "cos"]}
                            variant="outlined"
                            label="tytul"
                            required
                            style={{ margin: 8 }}
                            margin="normal"
                        />
                        "urlZdjeciaDoZadania"
                            <input
                            accept="image/*"
                            className={classes.input}
                            id="outlined-button-file"
                            type="file"
                        />
                        <label htmlFor="outlined-button-file">
                            <Button
                                variant="outlined"
                                component="span"
                                style={{ margin: 8 }}
                            >
                                WYBIERZ ZDJĘCIE DO ZADANIA
                            </Button>
                        </label>
                        <img src="https://firebasestorage.googleapis.com/v0/b/gterenowa.appspot.com/o/1.jpg?alt=media&token=022113f9-9284-4c80-94a4-fc3819993d96"
                            width="15%" height="15%" />

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* </Paper> */}
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Second one
                    </Typography>

                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Home);