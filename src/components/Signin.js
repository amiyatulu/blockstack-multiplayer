import React, { Component } from 'react';
import { isUserSignedIn } from 'blockstack';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar} from 'react-bulma-components';


export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <React.Fragment>
        <Navbar.Item  onClick={ handleSignIn.bind(this) }>
       
            Sign In with Blockstack
          
          </Navbar.Item>
        </React.Fragment>
        
    );
  }
}
