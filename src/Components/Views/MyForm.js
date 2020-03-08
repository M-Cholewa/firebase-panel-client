import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Select, MenuItem, FormControl, InputLabel, Paper, Button, TextField, CircularProgress } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControlLabel, IconButton } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles'
import Axios from "axios";


const styles = theme => ({
    paper: {
        marginBottom: theme.spacing.unit * 2,
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
        marginLeft: 20
    },
    saveBtn: {
        marginTop: 5,
    }
})

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            loading: false,
            // success: false,
            // image: '',
            buttonMessage: 'Zapisz',
        }
    }

    handleImageChange = event => {
        // console.log(document.getElementById("outlined-button-file" + this.props.id).value)
        // console.log(event.target.files)
        // console.log(event.target.files[0])
        let files = event.target.files;
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = () => {
                // this.setState({
                //     image: fr.result
                // })
                document.getElementById("imgSpotlight" + this.props.id).src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
        // console.log(this.state.image)
        console.log(document.getElementById("outlined-button-file" + this.props.id).files[0])
        // console.log(event.target.files[0])

        // this.setState({
        //     image: event.target.files[0]
        // })
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({
                // success: false,
                loading: true,
                buttonMessage: 'Czekaj..',
            })
            setTimeout(() => {
                this.setState({
                    // success: true,
                    loading: false,
                    buttonMessage: 'Zapisano'
                })
            }, 3000)
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    render() {
        const { loading } = this.state
        const { formValues, id, classes } = this.props

        return (<Paper className={classes.paper} elevation={1}>
            <ExpansionPanel square={false}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id={"additional-actions1-header" + id}
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
                            id={"czyWymagane" + id}>
                            czyWymagane
                    </InputLabel>
                        <Select
                            required
                            labelId="czyWymagane"
                            id={"demo-simple-select-outlined" + id}
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
                        id={"dobreOdpowiedzi" + id}
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
                        id={"lokalizacjaDl" + id}
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
                        id={"lokalizacjaSzer" + id}
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
                        id={"podpisObrazka" + id}
                        defaultValue={formValues.podpisObrazka}
                        variant="outlined"
                        label="podpisObrazka"
                        style={{ margin: 8 }}
                        margin="normal"
                    />

                    "podtytul"<br />
                    <TextField
                        id={"podtytul" + id}
                        defaultValue={formValues.podtytul}
                        variant="outlined"
                        label="podtytul"
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "trescZadania"<br />
                    <TextField
                        id={"trescZadania" + id}
                        defaultValue={formValues.trescZadania}
                        variant="outlined"
                        label="trescZadania"
                        required
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "tytul"
                    <TextField
                        id={"tytul" + id}
                        defaultValue={formValues.tytul}
                        variant="outlined"
                        label="tytul"
                        required
                        style={{ margin: 8 }}
                        margin="normal"
                    />
                    "urlZdjeciaDoZadania"

                <label htmlFor={"outlined-button-file" + id}>
                        <Button
                            variant="outlined"
                            component="span"
                            style={{ margin: 8 }}
                        >
                            <input
                                accept="image/*"
                                className={classes.input}
                                id={"outlined-button-file" + id}
                                onChange={e => { this.handleImageChange(e) }}
                                type="file"
                            />
                            WYBIERZ ZDJĘCIE DO ZADANIA
                    </Button>
                    </label>
                    <img
                        id={"imgSpotlight" + id}
                        src={formValues.urlZdjeciaDoZadania}
                        width="15%" height="15%"
                        alt={"img" + id} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        className={classes.saveBtn}
                        onClick={this.handleButtonClick}
                    >
                        {this.state.buttonMessage}
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>);
    }
}

export default withStyles(styles)(MyForm);