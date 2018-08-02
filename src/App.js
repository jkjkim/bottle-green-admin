import React, { Component } from 'react';
import './App.css';
import {firebase, db} from './utils/firebase';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import container
import Login from './containers/logIn';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      errorMsg: undefined,
      personalInfo: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        zip: ""
      }
    }

    // firebase check if user signed in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
        
        db.collection("users").doc(this.state.user.uid).get()
          .then(doc => {
            this.setState({personalInfo: doc.data()});
          })
      }

    });
  }

  render() {

    if (this.state.user == undefined) {
      return (
        <Router>
        <div>
          <Route exact path = "/login" render={() => <Login loggedIn = {(user) => {
            this.setState({user});
            this.redirectToHome;
          }} />}/>
          <Route exact path = "/" render={() => <Login loggedIn = {(user) => {
            this.setState({user});
            this.redirectToHome;
          }} />}/>
        </div>
        </Router>
      );
    }
  } else() {
    return (
      <div>hello</div>
    )
  }
}

export default App;
