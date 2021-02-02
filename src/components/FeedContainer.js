import React, { Component } from 'react';
import PlantCard from './PlantCard'

class FeedContainer extends Component {

    state = {
        index: 0
    }

    morePlants = () => {
        const {index} = this.state
        const {allPlants} = this.props
        // let newIndex = allPlants.length - index <= 3 ? 0 : index + 3
        this.setState(prevState => ({
            index: prevState.index + 3
        }))
    }

    renderButton = () => {
        let notUserPlants = this.props.allPlants.filter(plant => plant.user_id !== this.props.user.id) 
        if(notUserPlants.length - 1 > this.state.index + 3){
            return(
                <button className="gimme-more-btn" onClick={()=>this.morePlants()}>Gimme more!</button>
            )
        }
    }

    makePlantCards = () => {
        const {index} = this.state

        // filters all plants NOT belonging to user
        let notUserPlants = this.props.allPlants.filter(plant => plant.user_id !== this.props.user.id) 

        if(notUserPlants.length - 1 > index){
            // sorts plants newest to oldest by id
            let sortedNotUserPlants = notUserPlants.sort((a,b)=>(a.id < b.id ? 1 : -1))

            return sortedNotUserPlants.slice(0, index + 3).map(plant => {
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
                    <div className="dashboard-btn-div">
                        <button className="dashboard-btn-top" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                    </div>
                    {this.makePlantCards()}
                    <div className="gimme-more-btn-div">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }
}


export default FeedContainer;
