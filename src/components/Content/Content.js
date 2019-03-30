import React, { Component } from 'react';
import {Button, Alert} from 'react-bootstrap';

import {
  isSignInPending,
  loadUserData,
  Person,
  putFile,
  getFile,
  lookupProfile
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

class Content extends Component {
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

    handleNewStatusChange(event) {
        this.setState({newStatus: event.target.value})
      }
     
      handleNewStatusSubmit(event) {
        console.log("submit button click")
        this.saveNewStatus(this.state.newStatus)
        
        this.setState({
          newStatus: ""
        })
      }

      saveNewStatus(statusText) {
        let statuses = this.state.statuses
     
        let status = {
          id: this.state.statusIndex++,
          text: statusText.trim(),
          created_at: Date.now()
        }
     
        statuses.unshift(status)
        
        const options = { encrypt: false }
        putFile('statuses.json', JSON.stringify(statuses), options)
          .then(() => {
            this.setState({
              statuses: statuses
            })
          })
      }
      fetchData() {
        this.setState({ isLoading: true })
        const options = { decrypt: false }
        getFile('statuses.json', options)
          .then((file) => {
            var statuses = JSON.parse(file || '[]')
            this.setState({
              person: new Person(loadUserData().profile),
              username: loadUserData().username,
              statusIndex: statuses.length,
              statuses: statuses,
            })
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
        const { person } = this.state;
        const { username } = this.state;
 
        return (
        
        <React.Fragment>
            <div className="container">
            <div>
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
            <br/>
            <textarea className="form-control" rows="5" alue={this.state.newStatus}
                onChange = {e => this.handleNewStatusChange(e)}
                placeholder="Enter a status"></textarea>
          <br/>
            
            
            <Button variant="primary" onClick={e=> this.handleNewStatusSubmit(e)}>Submit</Button>
            
           
            </div>
        </React.Fragment> );
    }
}
 
export default Content;