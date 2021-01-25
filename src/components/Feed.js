import React, { Component } from 'react';
import FeedContainer from './FeedContainer'

class Feed extends Component {

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

    render() {
        return (
            <div className="big-feed-div" >
                <FeedContainer 
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

export default Feed;
