import React, { Component } from 'react';
import PlantCard from './PlantCard'

class PlantContainer extends Component {

    
    makeUserPlants = () => {
        if(this.props.user.user_plants){
            return this.props.user.user_plants.map(plant => {
                return <PlantCard 
                    key={plant.id}
                    plant={plant}
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
