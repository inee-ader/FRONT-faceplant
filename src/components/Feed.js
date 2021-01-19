import React, { Component } from 'react';
import FeedContainer from './FeedContainer'

class Feed extends Component {
    render() {
        return (
            <div>
                <h1>The Feed</h1>
                <FeedContainer /> 
            </div>
        );
    }
}

export default Feed;
