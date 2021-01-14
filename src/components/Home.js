import React, { Component } from 'react';
import Registration from './auth/Registration'; 
import Login from './auth/Login'
import axios from 'axios';

class Home extends Component {

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            this.props.handleLogout()
        })
        .catch(error => {
            console.log("logout error", error)
        })
    }

    render() {
        return (
            <div>
                <h1> HOME </h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Registration 
                    handleSuccessfulAuth={this.handleSuccessfulAuth} 
                />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                <button onClick={() => this.handleLogoutClick()} >Logout</button>
            </div>
        );
    }
}

export default Home;
