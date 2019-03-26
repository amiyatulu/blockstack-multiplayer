import React, { Component, Link } from 'react';
import Profile from './Profile';
import Signin from './Signin';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar} from 'react-bulma-components';


import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    console.log(this.handleSignOut,'in App.js');
    return (
      <React.Fragment>
         <Navbar color="primary">
            <Navbar.Brand>
                <Navbar.Item>Avrit</Navbar.Item>
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handleSignIn } />
            : <Profile handleSignOut={ this.handleSignOut } />
          }
                </Navbar.Container>            
            </Navbar.Menu>
        </Navbar>
      </React.Fragment>
    );
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}
