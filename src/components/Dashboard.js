import React, { Component } from 'react';
import PlantContainer from './PlantContainer'
import axios from 'axios'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com/'
const LOCAL = 'http://localhost:3000'

class Dashboard extends Component {

    componentDidMount(){
        // this.props.getUserPlants()
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
            <div>
                <h1>DASHBOARD</h1>
                <h1>{this.props.user.username} Status: {this.props.loggedInStatus}</h1>
                <h1>Plant Collection: </h1>
                <PlantContainer 
                    user={this.props.user}
                    plants={this.props.userPlants}
                    handleDeletePlant={this.props.handleDeletePlant}
                />
                <br></br>
                <button onClick={() => this.handleAddPlantClick()}>Add Plant</button>
                <button onClick={()=>this.handleEditUserClick()}>Edit User</button>
                <br></br>
                <br></br>
                <button onClick={() => this.handleFeedClick()}>Main Feed</button>
                <button onClick={() => this.handleLogoutClick()} >Logout</button>
                
            </div>
        );
    }
}

export default Dashboard;
