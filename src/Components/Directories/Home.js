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
            formValues: [],
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
            firebase.database().ref('zadanie/')
                .on('value', snapshot => {
                    // console.log(JSON.stringify(snapshot.val()))
                    // console.log(snapshot.key)
                    this.setState({ formValues: snapshot.val() })
                });
        })
    }

    render() {
        let index = 0;
        return (
            <div>
                <MyFormDialog
                // open={this.state.dialogOpened} closeCb={this.toggleDialogOpen}
                />
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
                {/* {this.state.formValues.map((value) => {
                    if (value != null) {
                        let key = Object.keys(this.state.formValues)[index]
                        index++
                        return (
                            <MyForm formValues={value} id={index} taskID={key} key={index} isNew={false} />
                        )
                    }
                })
                } */}
            </div>
        );
    }
}

export default Home;