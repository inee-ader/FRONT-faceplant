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
            <div>
                <h1>The Feed</h1>
                <FeedContainer 
                    user={this.props.user}
                    allPlants={this.props.allPlants}
                    handleLikePlant={this.props.handleLikePlant} /> 
                <br></br>
                <button onClick={() => this.dashboardClick()}>Dashboard</button>
            </div>
        );
    }
}

export default Feed;
