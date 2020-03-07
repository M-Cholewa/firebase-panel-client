import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper'
import ChipInput from 'material-ui-chip-input'
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    paper: {
        // ...theme.mixins.gutters(),
        // paddingTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    details: {
        flexDirection: "column"
    },
    input: {
        display: 'none',
    },
    formControlLabel: {
        marginLeft: 10
    }
})

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    render() {
        const { formValues, id, classes } = this.props
        return (<Paper className={classes.paper} elevation={1}>
            <ExpansionPanel square={false}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >

                    <IconButton
                        aria-label="Usuń zadanie"
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}>
                        <DeleteIcon style={{
                            color: red[500]
                        }} />
                    </IconButton>

                    <FormControlLabel
                        className={classes.formControlLabel}
                        aria-label="Acknowledge"
                        control={<div />}
                        label={id + ". " + formValues.tytul}
                    />

                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    "czyWymagane"
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                            id="czyWymagane">
                            czyWymagane
                    </InputLabel>
                        <Select
                            required
                            labelId="czyWymagane"
                            id="demo-simple-select-outlined"
                            labelWidth={this.state.labelWidth}
                            defaultValue={formValues.czyWymagane}
                        >
                            <MenuItem value={true}>Tak</MenuItem>
                            <MenuItem value={false}>Nie</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    "dobreOdpowiedzi"<br />
                    <ChipInput
                        id="dobreOdpowiedzi"
                        defaultValue={formValues.dobreOdpowiedzi}
                        // defaultValue={formValues.dobreOdpowiedzi}
                        variant="outlined"
                        label="dobreOdpowiedzi"
                        style={{ margin: 8 }}
                        type="number"
                        required
                    />

                    "lokalizacjaDl"<br />
                    <TextField
                        id="lokalizacjaDl"
                        defaultValue={formValues.lokalizacjaDl}
                        inputProps={{
                            step: "0.01",
                            lang: "en"
                        }}
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
                        defaultValue={formValues.lokalizacjaSzer}
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
                        defaultValue={formValues.podpisObrazka}
                        variant="outlined"
                        label="podpisObrazka"
                        style={{ margin: 8 }}
                        margin="normal"
                    />

                    "podtytul"<br />
                    <TextField
                        id="podtytul"
                        defaultValue={formValues.podtytul}
                        variant="outlined"
                        label="podtytul"
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "trescZadania"<br />
                    <TextField
                        id="trescZadania"
                        defaultValue={formValues.trescZadania}
                        variant="outlined"
                        label="trescZadania"
                        required
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "tytul"
                    <TextField
                        id="tytul"
                        defaultValue={formValues.tytul}
                        variant="outlined"
                        label="tytul"
                        required
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "urlZdjeciaDoZadania"

                <label htmlFor="outlined-button-file">
                        <Button
                            variant="outlined"
                            component="span"
                            style={{ margin: 8 }}
                        >
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="outlined-button-file"
                                type="file"
                            />
                            WYBIERZ ZDJĘCIE DO ZADANIA
                    </Button>
                    </label>
                    <img
                        src={formValues.urlZdjeciaDoZadania}
                        width="15%" height="15%" />

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>);
    }
}

export default withStyles(styles)(MyForm);