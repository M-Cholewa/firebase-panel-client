import Axios from "axios";
import React, { Component } from 'react';
import App from './App';
import Login from './Components/Directories/Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ProtectedRoute from './Components/Views/MyProtectedRoute'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import * as firebase from 'firebase/app'

import Particles from 'react-particles-js'
import particlesParams from './Files/json/particles'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottom: "2px solid rgba(255, 255, 255, 0.8)"
                },
                "&&&&:hover:before": {
                    borderBottom: "2px solid rgba(200, 200, 255, 0.42)"
                },
                '&:after': {
                    borderBottom: "2px solid rgba(50,50,255, 1)"
                }
            }
        }
    }
});

const firebaseConfig = {
    apiKey: "AIzaSyDZtSJpaLfQrq9m5gcTs9PmzUq9TbLUdcA",
    authDomain: "gterenowa.firebaseapp.com",
    databaseURL: "https://gterenowa.firebaseio.com",
    projectId: "gterenowa"
};

class ConfigApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.loadSetting()
    }

    loadSetting = () => {
        Axios.defaults.withCredentials = true

        Axios.interceptors.response.use(response => {
            // console.log({ "response": response.data, "result": true })
            return { "response": response.data, "result": true }
        }, error => {
            if (error.response.status === 401) {
                console.log("--------401 unauthorized-----------")
            } else if (error.response.status === 403) {
                console.log("--------403 forbidden-----------")
            } else if (error.response.status === 422)
                console.log("--------422 wrong entity-----------")
            // console.log({ "response": error.response.data, "result": false })
            return { "response": error.response.data, "result": false }
        })
        firebase.initializeApp(firebaseConfig);
    }

    // particlesItem = () => (
    //     <Particles params={particlesParams} style={styles.particles} />
    // )

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route strict path="/login"
                            render={() =>
                                <div>
                                    <Login>
                                        <Particles
                                            params={particlesParams}
                                            style={styles.particles}
                                            width="100vw" height="99vh" />
                                    </Login>
                                </div>
                            }>
                        </Route>
                        <ProtectedRoute path="/" component={App} />
                    </Switch>
                </BrowserRouter >
            </MuiThemeProvider>);
    }
}

const styles = {
    particles: {
        margin: "auto",
    },
}

export default ConfigApp;