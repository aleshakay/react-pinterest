import React from 'react';
import firebase from 'firebase/app';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardsContainer from '../components/BoardsContainer/BoardsContainer';

import './App.scss';
import SingleBoard from '../components/SingleBoard/SingleBoard';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    selectedBoardId: null,
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

  componentWillUnmount() {
    this.removeListener();
  }

  setSingleBoard = (selectedBoardId) => {
    this.setState({ selectedBoardId });
  }

  renderView = () => {
    const { authed, selectedBoardId } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (!selectedBoardId) {
      return (<BoardsContainer setSingleBoard={this.setSingleBoard} />);
    }
    return (<SingleBoard selectedBoardId={selectedBoardId} setSingleBoard={this.setSingleBoard} />);
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed} />
        <button className="btn btn-danger">Bootstrap Button</button>
        {/* if they are authenticated, load the board */}
        {/* else show login button */}
        {
          this.renderView()
        }
        {/* single board would only show up if you click on the board... once is does it will continue */}
      </div>
    );
  }
}

export default App;
