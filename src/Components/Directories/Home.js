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
        // Axios.post('http://localhost:8080/getDB').then(res => {
        //     this.setState({ formValues: res.response })
        //     console.log(res.response)
        //     console.log("RES ")
        // })
    }

    componentDidMount() {
        this.init()

    }
    init = () => {
        return new Promise(resolve => {
            if (!firebase.apps.length)
                firebase.initializeApp(config);
            firebase.database().ref('zadanie')
                .on('value', snapshot => {
                    // console.log(snapshot.val())
                    // let val = snapshot.val().filter(_val => _val)
                    // console.log(val)
                    this.setState({ formValues: snapshot.val() })
                });
        })
    }

    render() {
        // console.log(this.state.formValues)
        let index = 0;
        return (
            <div>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>

                {
                    // this.state.formValues.forEach((element, id, array) => {
                    //     let key = Object.keys(array)[id]
                    //     console.log(key + " KLUCZ")
                    // })
                    // this.state.formValues.forEach((value, id) => {
                    //     console.log(value)
                    // })
                    this.state.formValues.map((value) => {
                        if (value != null) {
                            // console.log("ID" + id)
                            let key = Object.keys(this.state.formValues)[index]
                            console.log(key + " KLUCZ")
                            index++
                            return (
                                <MyForm formValues={value} id={index} taskID={key} key={index} />
                            )
                        }
                    })
                }

            </div>
        );
    }
}

export default Home;