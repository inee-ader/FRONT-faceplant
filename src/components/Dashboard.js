import React, { Component } from 'react';
import EditUser from './EditUser'

class Dashboard extends Component {

    handleEditUserClick = () => {
        this.props.history.push("/edit_user")
    }

    render() {
        return (
            <div>
                <h1>DASHBOARD</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={()=>this.handleEditUserClick()}>Edit User</button>
            </div>
        );
    }
}

export default Dashboard;
