import React, { Component } from 'react';
import { Paper, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import classNames from 'classnames';

class Powiadomienia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success: false,
            buttonMessage: 'Wyślij',
        }
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({
                success: false,
                loading: true,
                buttonMessage: 'Czekaj..',
            })
            setTimeout(() => {
                this.setState({
                    success: true,
                    loading: false,
                    buttonMessage: 'Wysłano'
                })
            }, 3000)
        }
    }

    render() {
        const { classes } = this.props
        const { loading } = this.state

        const buttonClassname = classNames({
            [classes.buttonSuccess]: this.state.success,
        });

        return (
            <div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Wyślij komunikat (trwałe powiadomienie)
                        </Typography>
                    <Typography component="p">
                        Program wyśle powiadomienie, ktore dodatkowo zostanie zapisane w bazie danych, przez co będzie
                        się je dało wyświetlic kiedykolwiek w przeznaczonym do tego miejsu w aplikacji.
                    </Typography>
                    {/* //content here krepo */}
                    <form className={classes.container} name="f" method="POST">
                        <TextField
                            required
                            label="TYTUŁ"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            label="TREŚĆ"
                            multiline
                            rows="4"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        /><br></br>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={this.handleButtonClick}
                        >
                            {this.state.buttonMessage}
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                    </form>
                </Paper>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Wyślij proste, podstawowe powiadomienie
                    </Typography>
                    <Typography component="p">
                        Wysłane zostanie powiadomienie, ktore zniknie na zawsze z momentem kliknięcia na nie. Przykładem jest
                        push-notyfikacja, ktora przychodzi z zastępstwami.
              </Typography>
                    <form className={classes.container} name="f" method="POST" >
                        <TextField
                            required
                            label="TYTUŁ"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            label="TREŚĆ"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        /><br></br>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={buttonClassname}
                            disabled={loading}
                            onClick={this.handleButtonClick}
                        >
                            {this.state.buttonMessage}
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                    </form>
                </Paper>
            </div>
        )
    }
}
const styles = theme => ({
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
})
export default withStyles(styles)(Powiadomienia);