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
                        setUserShow={this.props.setUserShow}
                        user={this.props.user}
                        key={plant.id}
                        plant={plant}
                        handleLikePlant={this.props.handleLikePlant}
                        handleUnlikePlant={this.props.handleUnlikePlant}
                        setShownPlant={this.props.setShownPlant}
                        showPlant={this.props.showPlant}
                        showUser={this.props.showUser}
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
            <div className="feed-div" >
                <div className="feed-container">
                    <div>
                        <button className="dashboard-btn-top" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                    </div>
                    {this.makePlantCards()}
                </div>
            </div>
        );
    }
}

export default FeedContainer;
