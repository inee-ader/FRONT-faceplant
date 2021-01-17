import React, { Component } from 'react';

class PlantCard extends Component {

    render() {
        const { id, common_name, plant_name, image_url, personality, story_notes, insight, difficulty, moisture, sunlight } = this.props.plant

        return (
            <div>
                <h2>{common_name}</h2>
                <h4>{plant_name}</h4>
                <img src={image_url}></img>
                <br></br>
                <p>difficulty: {difficulty}</p>
                <p>moisture: {moisture}</p>
                <p>sunlight: {sunlight}</p>
                <br></br>
                <p>Personality: {personality}</p>
                <p>Story/Notes: {story_notes}</p>
                <h5>My best advice: {insight}</h5>
                <button onClick={this.props.handleEditPlantClick}>Edit Plant</button>
                {/* <button onClick={this.handleDeletePlant}>Delete Plant</button> */}
            </div>
        );
    }
}

export default PlantCard;
