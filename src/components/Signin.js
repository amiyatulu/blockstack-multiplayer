import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';



export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <React.Fragment>
        <Nav.Link  onClick={ handleSignIn.bind(this) }>
       
            Sign In with Blockstack
          
          </Nav.Link>
        </React.Fragment>
        
    );
  }
}
