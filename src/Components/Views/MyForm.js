import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Select, MenuItem, FormControl, InputLabel, Button, TextField, CircularProgress } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControlLabel, IconButton } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import Img from 'react-image'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { red, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles'
import Axios from "axios";
// import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
    expPanel: {
        marginBottom: theme.spacing(2),
        borderRadius: 5,

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
            nodes: [],
        }
        // let nodes = []
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

    handleFormSubmit = () => {
        if (!this.state.loading) {
            this.setState({
                // loading: true,
                buttonMessage: 'Czekaj..',
            })
            this.getFormValues()

            // Axios.post('http://localhost:8080/secure/submitForm', this.getFormValues())
            //     .then(res => {
            //         this.setState({
            //             responseObtained: true,
            //             success: res.result,
            //             loading: false,
            //             buttonMessage: res.response
            //         })
            //         let cbMessage = res.result ? "Zapisz" : "Sprawdź dane i spróbuj ponownie"
            //         setTimeout(() => this.setState(
            //             {
            //                 responseObtained: false,
            //                 buttonMessage: cbMessage
            //             }
            //         ), 5000)
            //     })
        }
    }
    handleTaskRemove = () => {
        Axios.post('http://localhost:8080/secure/removeTask', { 'key': this.props.taskID })
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
        let kolejnoscZadania = document.getElementById("kolejnoscZadania" + id).value
        let file = document.getElementById("outlined-button-file" + id).files[0];

        let formData = new FormData();
        if (this.props.taskID)
            formData.append('key', this.props.taskID)
        formData.append("czyWymagane", this.state.czyWymagane)
        formData.append("kolejnoscZadania", kolejnoscZadania)
        formData.append("dobreOdpowiedzi", JSON.stringify(this.state.dobreOdpowiedzi))
        formData.append("lokalizacjaDl", lokalizacjaDl)
        formData.append("lokalizacjaSzer", lokalizacjaSzer)
        formData.append("podpisObrazka", podpisObrazka)
        formData.append("podtytul", podtytul)
        formData.append("trescZadania", trescZadania)
        formData.append("wprowadzenieDoZadania", wprowadzenieDoZadania)
        formData.append("tytul", tytul)
        formData.append('image', file ? file : this.props.formValues.urlZdjeciaDoZadania);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        // return formData
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
    addNode = node => {
        // console.log(node)
        // this.setState({nodes})
        let nodes = this.state.nodes
        nodes.push(node)
        this.setState({ nodes })
        console.log(this.state.nodes)
        // input = node;
    }

    render() {
        const { loading, nodes } = this.state
        const { formValues, id, isNew, classes } = this.props
        try {
            nodes[0].value = formValues.podpisObrazka

        } catch (error) {

        }
        return (
            <ExpansionPanel
                className={classes.expPanel}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id={"additional-actions1-header" + id}
                >
                    {isNew ? <div />
                        : <IconButton
                            aria-label="Usuń zadanie"
                            onClick={event => {
                                this.handleTaskRemove()
                                event.stopPropagation()
                            }}
                            onFocus={event => event.stopPropagation()}>
                            <DeleteIcon style={{
                                color: red[500]
                            }} />
                        </IconButton>}

                    <FormControlLabel
                        className={classes.formControlLabel}
                        aria-label="Acknowledge"
                        control={<div />}
                        label={id + ". " + formValues.tytul}
                    />

                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <form
                        style={{ display: 'inherit', flexDirection: "column" }}
                        name="f" method="POST" onSubmit={e => {
                            e.preventDefault()
                            this.handleFormSubmit()

                        }}>

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
                                name="czyWymagane"
                                labelId="czyWymagane"
                                onChange={event => this.setState({ czyWymagane: event.target.value })}
                                // id={"demo-simple-select-outlined" + id}
                                labelWidth={this.state.labelWidth}
                                value={this.state.czyWymagane || true}
                            // value={false}
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
                                this.setState({ dobreOdpowiedzi: event })
                            }}
                            variant="outlined"
                            label="dobreOdpowiedzi"
                            style={{
                                margin: 8,
                                marginBottom: 25
                            }}
                            helperText="Wpisz jedną odpowiedź i kliknij 'enter'"
                            type="text"
                            margin="normal"
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
                            name="lokalizacjaDl"
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
                            name="lokalizacjaSzer"
                            type="number"
                            required
                            margin="normal"
                        />
                    "podpisObrazka"<br />
                        <TextField
                            id={"podpisObrazka" + id}
                            // defaultValue={formValues.podpisObrazka}
                            variant="outlined"
                            label="podpisObrazka"
                            // ref="podpisObrazka"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            margin="normal"
                        />
                    "kolejnoscZadania"<br />
                        <TextField
                            id={"kolejnoscZadania" + id}
                            defaultValue={formValues.kolejnoscZadania}
                            variant="outlined"
                            label="kolejnoscZadania"
                            style={{ margin: 8 }}
                            required
                            margin="normal"
                        />
                    "podtytul"<br />
                        <TextField
                            required
                            id={"podtytul" + id}
                            defaultValue={formValues.podtytul}
                            variant="outlined"
                            label="podtytul"
                            style={{ margin: 8 }}
                            name="podtytul"
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
                            name="trescZadania"
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
                            name="tytul"
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
                            name="wprowadzenieDoZadania"
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
                        <Img
                            id={"imgSpotlight" + id}
                            src={formValues.urlZdjeciaDoZadania}
                            style={{ width: "20%", height: "20%", margin: "auto" }}
                            alt={"img" + id} />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            style={{
                                backgroundColor:
                                    (!this.state.responseObtained)
                                        ? "#3f51b5"
                                        : this.state.success
                                            ? green[500]
                                            : red["A700"]

                            }}
                            className={classes.saveBtn}
                        >
                            {this.state.buttonMessage}
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(MyForm);