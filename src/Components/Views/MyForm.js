import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Select, MenuItem, FormControl, InputLabel, Button, TextField, CircularProgress } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControlLabel, IconButton } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { red, green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles'
import Axios from "axios";


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
            czyWymagane: props.formValues.czyWymagane,
            dobreOdpowiedzi: props.formValues.dobreOdpowiedzi,
            nodes: {},
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

    handleFormSubmit = () => {
        if (!this.state.loading) {
            this.setState({
                loading: true,
                buttonMessage: 'Czekaj..',
            })

            Axios.post('http://localhost:8080/secure/submitForm', this.getFormValues())
                .then(res => {
                    this.setState({
                        responseObtained: true,
                        success: res.result,
                        loading: false,
                        buttonMessage: res.response
                    })
                    let cbMessage = res.result ? "Zapisz" : "Sprawdź dane i spróbuj ponownie"
                    setTimeout(() => this.setState(
                        {
                            responseObtained: false,
                            buttonMessage: cbMessage
                        }
                    ), 5000)
                })
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
        let file = document.getElementById("outlined-button-file" + id).files[0];
        let formData = new FormData();

        if (this.props.taskID)
            formData.append('key', this.props.taskID)
        formData.append("czyWymagane", this.state.czyWymagane)
        formData.append("dobreOdpowiedzi", JSON.stringify(this.state.dobreOdpowiedzi))
        formData.append('image', file ? file : this.props.formValues.urlZdjeciaDoZadania);

        const { nodes } = this.state
        if (nodes !== {}) {
            Object.values(nodes).map((node) => {
                formData.append(node.name, node.value)
            })
        }
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
        return formData
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }

    addNode = node => {
        let nodes = this.state.nodes
        nodes[node.name] = node
        this.setState({ nodes })
    }

    render() {
        const { loading, nodes } = this.state
        const { formValues, id, isNew, classes } = this.props
        //if it is not empty
        if (nodes !== {}) {
            Object.values(nodes).map((node) => {
                if (formValues[node.name] != null)
                    node.value = formValues[node.name]
            })
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
                                labelWidth={this.state.labelWidth}
                                defaultValue={this.state.czyWymagane}
                            // inputRef={this.addNode}
                            >
                                <MenuItem value={true}>Tak</MenuItem>
                                <MenuItem value={false}>Nie</MenuItem>
                            </Select>
                        </FormControl>

                    "dobreOdpowiedzi"
                        <ChipInput
                            onChange={event => {
                                this.setState({ dobreOdpowiedzi: event })
                            }}
                            defaultValue={formValues.dobreOdpowiedzi}
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

                    "lokalizacjaDl"
                        <TextField
                            variant="outlined"
                            label="lokalizacjaDl"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="lokalizacjaDl"
                            margin="normal"
                            inputProps={{
                                step: "0.000001",
                                lang: "en"
                            }}
                            type="number"
                            required
                        />
                    "lokalizacjaSzer"
                        <TextField
                            variant="outlined"
                            label="lokalizacjaSzer"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="lokalizacjaSzer"
                            margin="normal"
                            inputProps={{
                                step: "0.000001",
                                lang: "en"
                            }}
                            type="number"
                            required
                        />
                    "kolejnoscZadania"
                        <TextField
                            variant="outlined"
                            label="kolejnoscZadania"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="kolejnoscZadania"
                            margin="normal"
                            required
                        />
                    "podtytul"
                        <TextField
                            variant="outlined"
                            label="podtytul"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="podtytul"
                            margin="normal"
                            required
                        />
                    "trescZadania"
                        <TextField
                            variant="outlined"
                            label="trescZadania"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="trescZadania"
                            margin="normal"
                            required
                        />
                    "tytul"
                    <TextField
                            variant="outlined"
                            label="tytul"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="tytul"
                            margin="normal"
                            required
                        />

                    wprowadzenieDoZadania
                    <TextField
                            variant="outlined"
                            label="wprowadzenieDoZadania"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="wprowadzenieDoZadania"
                            margin="normal"
                            required
                        />
                    "podpisObrazka"
                        <TextField
                            variant="outlined"
                            label="podpisObrazka"
                            inputRef={this.addNode}
                            style={{ margin: 8 }}
                            name="podpisObrazka"
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