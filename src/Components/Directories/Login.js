import React, { Component } from 'react';
import '../../Files/css/style2.css'
import avatar from '../../Files/images/avatar.png'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AxiosCalls from '../Classes/AxiosCalls'
import { Redirect } from 'react-router-dom'
import background from '../../Files/images/image1.jpg'


class Login extends Component {

    axiosCall = new AxiosCalls()

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            responseObtained: false,
            responseMessage: '',
            isAuthenticated: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        const { username, password } = this.state
        this.axiosCall.authorize(username, password)
            .then((res) => {
                this.setState({
                    responseObtained: true,
                    isAuthenticated: res.result,
                    responseMessage: res.response.message,
                })
            })
        event.preventDefault()
    }


    render() {

        const { classes } = this.props
        const { isAuthenticated } = this.state
        const { children } = this.props
        if (isAuthenticated) {
            return <Redirect to="/" />
        } else
            return (
                <section style={styles.section}>
                    {children}
                    <div className="loginbox">
                        <img src={avatar} alt="notFound" className="avatar"></img>
                        <h1>Zaloguj się</h1>
                        <form className={classes.container} name="f" method="POST" onSubmit={this.handleSubmit}>
                            <TextField
                                required
                                name="username"
                                onChange={this.handleChange}
                                autoComplete="off"
                                spellCheck="false"
                                label="Username"
                                margin="normal"
                                variant="standard"
                                SelectProps={{ color: '#FFF' }}
                                InputLabelProps={{ style: styles.InputLabelProps }}
                                inputProps={{ style: styles.inputProps }}
                                className={classes.textField}
                            />
                            <TextField
                                required
                                name="password"
                                onChange={this.handleChange}
                                autoComplete="off"
                                label="Password"
                                margin="normal"
                                type="password"
                                variant="standard"
                                InputLabelProps={{ style: styles.InputLabelProps }}
                                inputProps={{ style: styles.inputProps }}
                                className={classes.textField}
                            />

                            <input type="submit" name="" value="Login"></input>
                        </form>
                        <p align="center" style={styles.errorParagraph}>{this.state.responseMessage}</p>
                        <center><a href="/login">Lost your password?</a><br />
                            <a href="/login">Don't have an account?</a></center>
                    </div>
                </section>
            );
    }
}

//just some styles
const stylesInputs = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
        height: '60px',
        marginBottom: '20px',
        color: '#FFF',
        fontSize: '16px'
    },
});

const styles = {
    errorParagraph: {
        color: 'red',
        fontSize: '15px',
    },

    particles: {
        margin: "auto",
    },
    InputLabelProps: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: '#FFF',
    },
    inputProps: {
        color: '#FFF',
    },
    section: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        height: "100vh",
        width: "100vw",
        backgroundPosition: "center",
        fontFamily: "sans-serif"
    },
}

export default withStyles(stylesInputs)(Login);