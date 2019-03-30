import React, { Component} from 'react';
import Profile from './Profile';
import Signin from './Signin';
import Content from './Content/Content';
import OpenContent from './OpenContent/OpenContent';
import {Navbar, Nav} from 'react-bootstrap';
import {Switch, Route } from 'react-router-dom';


import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

export default class App extends Component {

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
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
            <Signin handleSignIn={ this.handleSignIn }  />
            :  <Profile handleSignOut={ this.handleSignOut } />
        
            
          }
    </Nav>
  </Navbar.Collapse>
</Navbar>
  { isUserSignedIn() ?  <Switch>
    <Route path="/" exact component={Content} />
    <Route path='/:username?' render={
    routerProps => <OpenContent {...routerProps} />
  }></Route></Switch> : null }
       
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
