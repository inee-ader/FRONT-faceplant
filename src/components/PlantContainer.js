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
                    handleDeletePlant={this.props.handleDeletePlant}
                    setShownPlant={this.props.setShownPlant}
                    showPlant={this.props.showPlant}
                />
            })
        }else{
            return <h3 className="add-plants">Add some plants!</h3>
        }
    }

    render() {
        return (
            <div className="plant-container">
                {this.makeUserPlants()}
            </div>
        );
    }
}

export default PlantContainer;
