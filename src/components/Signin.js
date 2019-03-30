import React, { Component } from 'react';
import { isUserSignedIn } from 'blockstack';
import {Nav} from 'react-bootstrap';



export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

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
