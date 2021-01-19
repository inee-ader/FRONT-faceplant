import React, { Component } from 'react';
import FeedContainer from './FeedContainer'

class Feed extends Component {

    render() {
        return (
            <div>
                <h1>The Feed</h1>
                <FeedContainer allPlants={this.props.allPlants}/> 
            </div>
        );
    }
}

export default Feed;
