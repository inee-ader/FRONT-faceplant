import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>DASHBOARD</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
            </div>
        );
    }
}

export default Dashboard;
