import Axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";


class AxiosCalls {
    checkAuths = () => {
        return Axios.post('http://localhost:8080/checkLogged')
    }

    // getDB = () => {
    //     return Axios.post('http://localhost:8080/getDB')
    // }

    authorize = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    // Send token to your backend via HTTPS
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                        .then(_idToken => {
                            /** const _csrfToken = getCookie('csrfToken')
                            console.log(_csrfToken) */
                            Axios.post('http://localhost:8080/sessionLogin', { idToken: _idToken, /** csrfToken: _csrfToken */ }, { withCredentials: true })
                                .then((response) => {
                                    resolve(response)
                                    console.log(response)
                                })
                                .catch((error) => {
                                    reject(error)
                                    console.log("axios error: " + error)
                                })

                        }).catch(function (error) {
                            console.log("firebase error: " + error)
                        })
                })
                .catch(error => {
                    resolve({ "response": error, "result": false })
                    console.log("login error: " + error)
                    // document.getElementById("loginErr").innerText = error.message
                })
        })


    }
}

export default AxiosCalls