import React, { Component } from 'react';
import PlantCard from './PlantCard'

class FeedContainer extends Component {

    makePlantCards = () => {
        if(this.props.allPlants.length){
            // filters all plants NOT belonging to user
            let notUserPlants = this.props.allPlants.filter(plant => plant.user_id !== this.props.user.id) 
            // sorts plants newest to oldest by id
            let sortedNotUserPlants = notUserPlants.sort((a,b)=>(a.id < b.id ? 1 : -1))
            return sortedNotUserPlants.map(plant => {
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
            <div className="big-feed-div" >
                <div className="feed-container">
                    {this.makePlantCards()}
                </div>
                <div>
                    <button id="dashboard-btn" className="adore-btn" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                </div>
            </div>
        );
    }
}

export default FeedContainer;
