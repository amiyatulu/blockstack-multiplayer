import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import {
  isSignInPending,
  loadUserData,
  Person,
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
      },
  	};
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return (
      
      !isSignInPending() && person ?
      <React.Fragment>
      <Nav.Link onClick={ handleSignOut.bind(this)} ><img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage }  height="30px" alt="myimage" /> &nbsp;&nbsp;
      { person.name() ? person.name() : 'Nameless Person' }&nbsp;&nbsp;
      
            Logout </Nav.Link>
       
        </React.Fragment>: null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
