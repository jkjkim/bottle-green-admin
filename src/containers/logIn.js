import React, {Component} from 'react';
import {firebase, db, admin} from '../utils/firebase';
import {Link} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            email: "",
            password: "",
            errMsg: "",
        };
        
        this.tryLogin = this.tryLogin.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    tryLogin() {

        console.log(this.state.email + " " + this.state.password);

        admin.auth().getUserByEmail(this.state.email)
        .then(function(userRecord) {
                db.collection("admin").doc(userRecord.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                            .then(user => {
                                this.props.loggedIn(user);
                            })
                            .catch(err => {
                                this.setState({errMsg: err.message})
                            })
                    }
                })
                .catch(function() {
                    console.log("user not admin");
                })
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error);
            });
    }

    handleChangeEvent(event) {    
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div >
                <form onSubmit = {event => {
                event.preventDefault();
                this.tryLogin();
                }}>
                    <label>Email</label>
                    <input type = "text" name="email" value={this.state.email} onChange={this.handleChangeEvent}/>

                    <label>Password</label>
                    <input type = "password" name="password" value = {this.state.password} onChange = {this.handleChangeEvent}/>

                    <div>{this.state.errMsg}</div>
                    <button> Log In </button>
                </form>

                <div>
                    Don't have an account? You need to download the green-bottle app
                    first to make a new account.
                </div>
                <div>
                    Test - use Mail: 123@123.com, pw: 123456
                </div>
            </div>
        )
    }
}