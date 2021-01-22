import React, { Component } from 'react';
import FeedContainer from './FeedContainer'

class Feed extends Component {

    componentDidMount(){
        this.props.getAllPlants()
    }

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }

    

    render() {
        return (
            <div className="big-feed-div" >
                <FeedContainer 
                    user={this.props.user}
                    allPlants={this.props.allPlants}
                    handleLikePlant={this.props.handleLikePlant}
                    handleUnlikePlant={this.props.handleUnlikePlant}
                    dashboardClick={this.dashboardClick} /> 
                <br></br>
                
            </div>
        );
    }
}

export default Feed;
