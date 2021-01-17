import React, { Component } from 'react';
import PlantCard from './PlantCard'

class PlantContainer extends Component {
    
    
    makeUserPlants = () => {
        if(this.props.plants.length){
            // console.log("plants! ", this.props.plants)
            return this.props.plants.map(plant => {
                return <PlantCard 
                    key={plant.id}
                    plant={plant}
                    handleEditPlantClick={this.props.handleEditPlantClick}
                />
            })
        }else{
            return <h3>Add some plants!</h3>
        }
    }

    render() {
        return (
            <div>
                <h3>Plants</h3>
                {this.makeUserPlants()}
            </div>
        );
    }
}

export default PlantContainer;
