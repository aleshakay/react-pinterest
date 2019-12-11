import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import firebase from 'firebase/app';
import Auth from '../components/Auth/Auth';
import firebaseConnection from '../helpers/data/connection';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <button className="btn-danger">button</button>
        {
        (authed) ? (<div>You logged in </div>) : (<Auth />)
        }
      </div>
    );
  }
}

export default App;
