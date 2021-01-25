import React, { Component } from 'react';
import Registration from './auth/Registration'; 
import Login from './auth/Login'

class Home extends Component {

    componentDidMount () {
        this.props.renderHeader()
    }

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div className="home-div">
                <Registration 
                    handleSuccessfulAuth={this.handleSuccessfulAuth} 
                />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                
            </div>
        );
    }
}

export default Home;
