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
    iconButton: {
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
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
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Zaznacz wszystkie dni wolne od szkoły, oprocz weekendow
                    </Typography>

                    <ExpansionPanel>
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
                        <ExpansionPanelDetails>
                            <img src="https://firebasestorage.googleapis.com/v0/b/gterenowa.appspot.com/o/1.jpg?alt=media&token=022113f9-9284-4c80-94a4-fc3819993d96"
                                width="15%" height="15%" />
                            {/* <div style={{ clear: "both" }} /> */}

                            "czyWymagane"
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={"inputLabel"} id="demo-simple-select-outlined-label">
                                    czyWymagane
                            </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
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
                            "lokalizacjaDl"<br />
                            "lokalizacjaSzer"<br />
                            "podpisObrazka"<br />
                            "podtytul"<br />
                            "trescZadania"<br />

                            "tytul"
                            <TextField
                                id="standard-full-width"
                                value={"rozbiory"}
                                variant="outlined"
                                label="tytul"
                                style={{ margin: 8 }}
                                placeholder="tytul"
                                helperText="Powyższe dni zostaną wysłane do bazy danych!"
                                // fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /><br />
                            "urlZdjeciaDoZadania"
                            <Typography color="textSecondary">
                                The click event of the nested action will propagate up and expand the panel unless you
                                explicitly stop it.
                     </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>


                    {/* <Typography component="p">
                        Program będzie losował szczęśliwe numerki w dni od poniedziałku do piątku, w dni szkolne.
                        Cel zaznaczenia dni wolnych od nauki jest taki, że program będzie wiedział w które dni
                        powstrzymac się od losowania.
                        Przykładowa strona, ktora wyświetla dni wolne od nauki szkolnej:
                <a href="https://www.kalendarzswiat.pl/kalendarz_szkolny">klik</a>
                        . Do informacji z niej trzeba dodac szkolne, indywidualne dni wolne(egzaminy zawodowe, święta,
                        ferie, itd..)
          </Typography> */}

                    <TextField
                        id="standard-full-width"
                        value={this.state.selectedDays ? this.state.selectedDays.map(item => {
                            return (
                                item.toLocaleDateString()
                            )
                        }) : "Wybierz jakieś dni"}

                        label="Zaznaczone dni"
                        style={{ margin: 8 }}
                        placeholder="<--! Tekst wprowadzany automatycznie !-->"
                        helperText="Powyższe dni zostaną wysłane do bazy danych!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
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