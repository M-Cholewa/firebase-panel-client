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
    },

})

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            loading: false,
            responseObtained: false,
            success: true,
            buttonMessage: 'Zapisz',
            czyWymagane: true,
            dobreOdpowiedzi: [],
        }
    }

    handleImageChange = event => {
        let files = event.target.files;
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = () => {
                document.getElementById("imgSpotlight" + this.props.id).src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }

    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({
                loading: true,
                buttonMessage: 'Czekaj..',
            })
            // this.getFormValues()


            Axios.post('http://localhost:8080/submitForm', this.getFormValues())
                .then(res => {
                    this.setState({
                        responseObtained: true,
                        success: res.result,
                        loading: false,
                        buttonMessage: res.response
                    })
                    console.log(res)
                })
        }
    }
    handleTaskRemove = () => {
        Axios.post('http://localhost:8080/removeTask', { 'key': this.props.taskID })
            .then(res => {
                alert('usunieto! ' + res)
            })
            .catch(err => {
                alert('blad! ' + err)
            })

    }

    getFormValues = () => {
        let id = this.props.id

        let lokalizacjaDl = document.getElementById("lokalizacjaDl" + id).value
        let lokalizacjaSzer = document.getElementById("lokalizacjaSzer" + id).value
        let podpisObrazka = document.getElementById("podpisObrazka" + id).value
        let podtytul = document.getElementById("podtytul" + id).value
        let trescZadania = document.getElementById("trescZadania" + id).value
        let tytul = document.getElementById("tytul" + id).value
        let wprowadzenieDoZadania = document.getElementById("wprowadzenieDoZadania" + id).value
        let file = document.getElementById("outlined-button-file" + id).files[0];

        let formData = new FormData();
        formData.append('key', this.props.taskID)
        formData.append("czyWymagane", this.state.czyWymagane)
        formData.append("dobreOdpowiedzi", JSON.stringify(this.state.dobreOdpowiedzi))
        formData.append("lokalizacjaDl", lokalizacjaDl)
        formData.append("lokalizacjaSzer", lokalizacjaSzer)
        formData.append("podpisObrazka", podpisObrazka)
        formData.append("podtytul", podtytul)
        formData.append("trescZadania", trescZadania)
        formData.append("wprowadzenieDoZadania", wprowadzenieDoZadania)
        formData.append("tytul", tytul)
        formData.append('image', file ? file : this.props.formValues.urlZdjeciaDoZadania);
        // console.log(file ? file : this.props.formValues.urlZdjeciaDoZadania)

        // console.log(czyWymagane)

        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }


        return formData
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
        this.setState({
            czyWymagane: this.props.formValues.czyWymagane,
            dobreOdpowiedzi: this.props.formValues.dobreOdpowiedzi
        })
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
                        onClick={event => {
                            this.handleTaskRemove()
                            event.stopPropagation()
                        }}
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
                    {/* <form className={classes.root} name="f" method="POST" onSubmit={this.handleSubmit}> */}

                    "czyWymagane"
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        id={"formControl" + id}>
                        <InputLabel ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                            id={"czyWymagane" + id}>
                            czyWymagane
                    </InputLabel>
                        <Select
                            required
                            labelId="czyWymagane"
                            onChange={event => this.setState({ czyWymagane: event.target.value })}
                            id={"demo-simple-select-outlined" + id}
                            labelWidth={this.state.labelWidth}
                            value={this.state.czyWymagane}
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
                        onChange={event => {
                            // console.log(event)
                            this.setState({ dobreOdpowiedzi: event })
                        }}
                        variant="outlined"
                        label="dobreOdpowiedzi"
                        style={{ margin: 8 }}
                        type="text"
                        margin="normal"
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
                    wprowadzenieDoZadania
                    <TextField
                        id={"wprowadzenieDoZadania" + id}
                        defaultValue={formValues.wprowadzenieDoZadania}
                        variant="outlined"
                        label="wprowadzenieDoZadania"
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
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        // color={red[100]}
                        style={{
                            backgroundColor: (this.state.responseObtained && !this.state.success)
                                ? red["A700"] : "#3f51b5"
                        }}
                        // style={{ backgroundColor: red[500] }}
                        // style={this.state.responseObtained&&}
                        className={classes.saveBtn}
                        onClick={this.handleButtonClick}
                    >
                        {/* <input type="submit" name="" value="Login"></input> */}

                        {this.state.buttonMessage}
                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                    {/* </form> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>);
    }
}

export default withStyles(styles)(MyForm);