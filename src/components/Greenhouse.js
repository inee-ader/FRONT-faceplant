import React, { Component } from 'react';
import FeedContainer from './FeedContainer'
import "../style/Greenhouse.css"

class Greenhouse extends Component {
    
    componentDidMount(){
        this.props.getAllPlants()
        this.props.renderHeader()
    }

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }

    showPlant = (plant) => {
        this.props.history.push(`/show_plant/${plant.id}`)
    }
    
    showUser = (user) => {
        this.props.history.push(`/show_user/${user.id}`)
    }

    render() {
        return (
            <div className="big-feed-div" >
                <FeedContainer 
                    setUserShow={this.props.setUserShow}
                    showUser={this.showUser}
                    setShownPlant={this.props.setShownPlant}
                    user={this.props.user}
                    allPlants={this.props.allPlants}
                    handleLikePlant={this.props.handleLikePlant}
                    handleUnlikePlant={this.props.handleUnlikePlant}
                    dashboardClick={this.dashboardClick}
                    showPlant={this.showPlant} /> 
                <br></br>
            </div>
        );
    }
}

export default Greenhouse;
