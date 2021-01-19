import React, { Component } from 'react';
import FeedContainer from './FeedContainer'

class Feed extends Component {

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }
    render() {
        return (
            <div>
                <h1>The Feed</h1>
                <FeedContainer allPlants={this.props.allPlants}/> 
                <br></br>
                <button onClick={() => this.dashboardClick()}>Dashboard</button>
            </div>
        );
    }
}

export default Feed;
