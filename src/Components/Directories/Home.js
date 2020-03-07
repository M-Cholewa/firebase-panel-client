import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import MyForm from '../Views/MyForm'

import Axios from "axios";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelWidth: 0,
            formValues: [],
        }
        Axios.post('http://localhost:8080/getDB').then(res => {
            this.setState({ formValues: res.response })
            console.log(res.response)
        })
    }

    render() {

        return (
            <div>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>

                {
                    this.state.formValues.map((value, id) => {
                        if (value != null)
                            return (
                                <MyForm formValues={value} id={id} />
                                // <div>{value.tytul}</div> 
                            )
                    })}

            </div>
        );
    }
}

export default Home;