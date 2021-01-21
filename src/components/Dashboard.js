import React, { Component } from 'react';
import PlantContainer from './PlantContainer'
import axios from 'axios'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com/'
const LOCAL = 'http://localhost:3000'

class Dashboard extends Component {

    componentDidMount(){
        this.props.getUserPlants()
    }

    handleEditUserClick = () => {
        this.props.history.push("/edit_user")
    }

    handleLogoutClick = () => {
        axios.delete(`${LOCAL}/logout`, 
        { withCredentials: true })
        .then(response => {
            // console.log("delete session")
            this.props.handleLogout()
            this.props.history.push("/")
        })
        .catch(error => {
            console.log("logout error", error)
        })
    }

    handleAddPlantClick = () => {
        this.props.history.push('/add_plant')
    }

    handleEditPlantClick = () => {
        this.props.history.push("/edit_plant")
    }

    handleFeedClick = () => {
        this.props.history.push("/feed")
    }

    render() {
        return (
            <div className="dashboard">
                <img className="user-dashboard-icon" src={this.props.user.icon} />
                <h2>{this.props.user.username} Status: {this.props.loggedInStatus}</h2>
                <div className="dashboard-btn-div">
                    <button className="adore-btn" onClick={() => this.handleAddPlantClick()}>Add Plant</button>
                    <button className="adore-btn" onClick={()=>this.handleEditUserClick()}>Edit User</button>
                    <button className="adore-btn" onClick={() => this.handleFeedClick()}>Greenhouse</button>
                    <button className="adore-btn" onClick={() => this.handleLogoutClick()} >Logout</button>
                </div>
                <h2>Plant Collection: </h2>
                <PlantContainer 
                    user={this.props.user}
                    plants={this.props.userPlants}
                    handleDeletePlant={this.props.handleDeletePlant}
                />
                <br></br>
            </div>
        );
    }
}

export default Dashboard;
