import React, { Component } from 'react';
import Registration from './auth/Registration'; 
import Login from './auth/Login'
import '../style/Home.css'

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
            <div className="home-wrapper">
                <div className="about-div">
                    <p className="about-p">Welcome to FacePlant! This lovely app is designed to keep your plant collection in a place you can easily gaze on their beauty anywhere you are. View other user's plants in the Greenhouse where you can 'adore' and comment too! </p>
                </div>
                <div className="home-div">
                    <Registration 
                        handleSuccessfulAuth={this.handleSuccessfulAuth} 
                    />
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth}
                    />
                </div>
            </div>
        );
    }
}

export default Home;
