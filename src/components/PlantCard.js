import React, { Component } from 'react';

class PlantCard extends Component {

    handleDeleteClick = () => {
        this.props.handleDeletePlant(this.props.plant.id)
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
                <button onClick={() => this.handleDeleteClick()}>Delete {plant_name}</button>
            </div>
        );
    }
}

export default PlantCard;
