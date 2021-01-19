import React, { Component } from 'react';
import PlantCard from './PlantCard'

class FeedContainer extends Component {

    makePlantCards = () => {
        if(this.props.allPlants.length){
            let notUserPlants = this.props.allPlants.filter(plant => plant.user_id !== this.props.user.id) 
            return notUserPlants.map(plant => {
                return (
                    <PlantCard 
                        key={plant.id}
                        plant={plant}
                        handleLikePlant={this.props.handleLikePlant}
                    />
                )
            })
        }else {
            return (
                <p> Sorry, no plants to see here... </p>
            )
        }
    }
    
    render() {
        return (
            <div>
                <p>Items in the feed...</p>
                {this.makePlantCards()}
            </div>
        );
    }
}

export default FeedContainer;
