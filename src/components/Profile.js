import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Navbar} from 'react-bulma-components';
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
    console.log(this.props, 'in profile');
    const { handleSignOut } = this.props;
    console.log(handleSignOut,'in profile3');
    const { person } = this.state;
    return (
      
      !isSignInPending() ?
      <React.Fragment>
      <Navbar.Item><img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } alt="myimage" /></Navbar.Item>
      <Navbar.Item>{ person.name() ? person.name() : 'Nameless Person' }</Navbar.Item>
      <Navbar.Item onClick={ handleSignOut.bind(this)} >
            Logout </Navbar.Item>
       
        </React.Fragment>: null
    );
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }
}
