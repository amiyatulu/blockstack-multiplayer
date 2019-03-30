import React, { Component} from 'react';
import Profile from './Profile';
import Signin from './Signin';
import Content from './Content/Content';
import {Navbar, Nav} from 'react-bootstrap';
import Styles from './App.module.css';


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
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Avrit</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    
      <Nav.Link href="#features">Features</Nav.Link>
      
    
    </Nav>
    <Nav>
    { !isUserSignedIn() ?
            <Signin handleSignIn={ this.handleSignIn } />
            : <Profile handleSignOut={ this.handleSignOut } />
          }
    </Nav>
  </Navbar.Collapse>
</Navbar>
  { isUserSignedIn() ?  <Content/> : null }
       
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
