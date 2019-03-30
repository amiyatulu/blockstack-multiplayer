import React, { Component } from 'react';
import { Alert} from 'react-bootstrap';

import {
  loadUserData,
  Person,
  getFile,
  lookupProfile
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

class OpenContent extends Component {
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
            username:"",
            newStatus:"",
            statuses:[],
            statusIndex:0,
            isLoading:false
         }
    }

    
   
      fetchData() {
        const username = this.props.match.params.username
        console.log(username);
        lookupProfile(username)
          .then((profile) => {
            this.setState({
              person: new Person(profile),
              username: username
            })
            console.log(this.state)
          })
          .catch((error) => {
            console.log('could not resolve profile')
          })
          const options = {  username: username, decrypt: false}
          console.log(options)
          getFile('statuses.json', options)
            .then((file) => {
              var statuses = JSON.parse(file || '[]')
              console.log(statuses)
              this.setState({
                statusIndex: statuses.length,
                statuses: statuses
              })
            })
            .catch((error) => {
              console.log("could not fetch statuses")
            })
            .finally(() => {
              this.setState({ isLoading: false })
            })
      }

    componentWillMount() {
    
        this.setState({
          person: new Person(loadUserData().profile),
          username: loadUserData().username
        });
   
      }
      componentDidMount() {
        this.fetchData()
      }
    

    render() {
 
        return (
        
        <React.Fragment>
            <div className="container">
           
                <br/>
                <br/>
                {this.state.isLoading && <span>Loading...</span>}
                {this.state.statuses.map((status) => (
                <Alert variant="primary" key={status.id}>
                {status.text}
            </Alert>
                )
                )}
            </div>
            
        
        </React.Fragment> );
    }
}
 
export default OpenContent;