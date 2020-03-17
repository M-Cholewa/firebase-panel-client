import React, { Component } from 'react'

import MyForm from '../Views/MyForm'
import MyFormDialog from '../Views/MyFormDialog'
import * as firebase from "firebase/app";
import config from '../../Files/FirebaseConfig'
import "firebase/database"


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            formValues: {},
            dialogOpened: false,
        }
    }

    componentDidMount() {
        this.init()
    }

    toggleDialogOpen = () => {
        this.setState(prevState => (
            { dialogOpened: !prevState.dialogOpened })
        )
    }

    init = () => {
        return new Promise(resolve => {
            if (!firebase.apps.length)
                firebase.initializeApp(config);
            firebase.database().ref('zadanie').orderByChild('kolejnoscZadania')
                .on('value', snapshot => {
                    let form = {}
                    snapshot.forEach((data) => {
                        let dataKey = data.key.toString()
                        form[dataKey] = data.val()
                    });
                    this.setState({ formValues: form })
                    resolve()
                });
        })
    }

    render() {
        let index = 0;
        return (
            <div>
                {
                    Object.values(this.state.formValues).
                        map(value => {
                            if (value != null) {
                                let key = Object.keys(this.state.formValues)[index]
                                index++
                                return (
                                    <MyForm formValues={value} id={index} taskID={key} key={index} isNew={false} />
                                )
                            }
                            console.log(value)
                        })

                }
                <MyFormDialog />
            </div>
        );
    }
}

export default Home;