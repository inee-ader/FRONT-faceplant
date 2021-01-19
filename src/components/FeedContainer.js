import React, { Component } from 'react';
import PlantCard from './PlantCard'

class FeedContainer extends Component {

    makePlants = () => {
        if(this.props.allPlants.length){
            // filter through allPlants for plants that DO NOT belong to current user 
            // console.log("plants! ", this.props.allPlants)
            return this.props.allPlants.map(plant => {
                return <PlantCard 
                    key={plant.id}
                    plant={plant}

                />
            })
        }
        // else{
        //     return <h3>Add some plants!</h3>
        // }
    }

    render() {
        return (
            <div>
                <p>Items in the feed...</p>
                {this.makePlants()}
            </div>
        );
    }
}

export default FeedContainer;
