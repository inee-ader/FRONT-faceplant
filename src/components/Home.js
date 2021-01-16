import React, { Component } from 'react';
import Registration from './auth/Registration'; 
import Login from './auth/Login'
import axios from 'axios';

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app/'
const LOCAL = 'http://localhost:3000'

class Home extends Component {

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div>
                <h1> HOME </h1>
                <h1>{this.props.user.username} Status: {this.props.loggedInStatus}</h1>
                <Registration 
                    handleSuccessfulAuth={this.handleSuccessfulAuth} 
                />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                
            </div>
        );
    }
}

export default Home;
