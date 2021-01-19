import React, { Component } from 'react';
 

class PlantCard extends Component {

    handleDeleteClick = () => {
        this.props.handleDeletePlant(this.props.plant.id)
    }

    handleLikeClick = () => {
        console.log()
    }

    renderDeleteButton = () => {
        
        if(window.location.pathname === '/dashboard'){
            return (
                <button onClick={() => this.handleDeleteClick()}>Delete {this.props.plant.plant_name}?</button>
            )
        }else if(window.location.pathname === '/feed'){
            return (
                <button onClick={() => this.handleLikeClick()}>Adore</button>
            )
        }else{
            null
        }
    }

    render() {
        const { id, common_name, plant_name, image_url, personality, story_notes, insight, difficulty, moisture, sunlight } = this.props.plant

        return (
            <div className="plant-card">
                <h2>{common_name} - {plant_name}</h2>
                <img src={image_url}></img>
                <br></br>
                <p>difficulty: {difficulty}</p>
                <p>moisture: {moisture}</p>
                <p>sunlight: {sunlight}</p>
                <br></br>
                <p>Personality: {personality}</p>
                <p>Story/Notes: {story_notes}</p>
                <h5>My best advice: {insight}</h5>
                {this.renderDeleteButton()}
            </div>
        );
    }
}

export default PlantCard;
