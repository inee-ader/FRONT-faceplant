import React, { Component } from 'react';
import PlantContainer from './PlantContainer'
import axios from 'axios'
import '../style/Dashboard.css'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class Dashboard extends Component {

    componentDidMount(){
        this.props.getUserPlants()
        this.props.renderHeader()
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
        this.props.history.push("/greenhouse")
    }

    showPlant = (plant) => {
        this.props.history.push(`/show_plant/${plant.id}`)
    }

    render() {
        return (
            <div className="dashboard">
                <div>
                    <h2 className="user-name-icon"><img className="user-dashboard-icon" src={this.props.user.icon} />
                    {this.props.user.username}</h2>
                </div>
                <div className="dashboard-btn-div-top">
                    <button className="dashboard-btn" onClick={() => this.handleAddPlantClick()}>Add Plant</button>
                    <button className="dashboard-btn" onClick={() => this.handleFeedClick()}>Greenhouse</button>
                </div>
                <h2 className="h-plant-collection"> YOUR PLANT COLLECTION</h2>
                <PlantContainer 
                    user={this.props.user}
                    plants={this.props.userPlants}
                    handleDeletePlant={this.props.handleDeletePlant}
                    setShownPlant={this.props.setShownPlant}
                    showPlant={this.showPlant}
                />
                <br></br>
                <div className="dashboard-btn-div-bottom">
                    <button className="dashboard-btn" onClick={()=>this.handleEditUserClick()}>Edit User</button>
                    <button className="dashboard-btn" onClick={() => this.handleLogoutClick()} >Logout</button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
