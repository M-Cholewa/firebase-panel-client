import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import MyForm from '../Views/MyForm'
import * as firebase from "firebase/app";
import config from '../../Files/FirebaseConfig'
import "firebase/database"
import Axios from "axios";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            formValues: [],
        }
        if (!firebase.apps.length)
            firebase.initializeApp(config);
        firebase.database().ref('zadanie')
            .on('value', snapshot => {
                this.setState({ formValues: snapshot.val() })
                console.log(snapshot.val())
                console.log("SNAPSHOT ")
            });
        // Axios.post('http://localhost:8080/getDB').then(res => {
        //     this.setState({ formValues: res.response })
        //     console.log(res.response)
        //     console.log("RES ")
        // })
    }

    render() {

        return (
            <div>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>

                {
                    this.state.formValues.map((value, id) => {
                        if (value != null || value == []) {
                            let key = Object.keys(this.state.formValues)[id]
                            console.log(key + " KLUCZ")
                            return (
                                <MyForm formValues={value} id={id} taskID={key} key={id} />
                            )
                        }

                    })}

            </div>
        );
    }
}

export default Home;