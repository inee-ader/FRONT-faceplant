import React, { Component } from 'react';

class PlantCard extends Component {


    render() {
        const { common_name, plant_name, image_url, personality, story_notes, insight, difficulty, moisture, sunlight } = this.props.plant
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
                <p>{personality}</p>
                <p>{story_notes}</p>
                <h5>{insight}</h5>
            </div>
        );
    }
}

export default PlantCard;
