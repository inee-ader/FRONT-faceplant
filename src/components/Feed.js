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
            <div className="feed-div" >
                <FeedContainer 
                    user={this.props.user}
                    allPlants={this.props.allPlants}
                    handleLikePlant={this.props.handleLikePlant}
                    dashboardClick={this.dashboardClick} /> 
                <br></br>
                
            </div>
        );
    }
}

export default Feed;
