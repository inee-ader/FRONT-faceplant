import React, { Component } from 'react';
 

class PlantCard extends Component {

    handleDeleteClick = () => {
        this.props.handleDeletePlant(this.props.plant.id)
    }

    handleLikeClick = (id) => {
        this.props.handleLikePlant(id)
    }

    renderCardType = () => {
        if(window.location.pathname === '/dashboard'){
            return (
                <div className="delete-btn-div" >
                    <button onClick={() => this.handleDeleteClick()}>Delete {this.props.plant.plant_name}?</button>
                </div>
            )
        }else if(window.location.pathname === '/feed'){
            return (
                <div id="adore-btn-p">
                    <div className="adore-btn-div">
                        <button className="adore-btn" onClick={() => this.handleLikeClick(this.props.plant.id)}>Adore</button>
                    </div>
                    <br/>
                    <div>
                        <p>{this.props.plant.user_likes.length} people adore this plant</p>
                    </div>
                </div>
            )
        }else{
            null
        }
    }

    renderUserIcon = () => {
        if(window.location.pathname=== "/feed"){
            return (
                <img className="user-feed-icon" alt={this.props.plant.user_name} src={this.props.plant.user_icon}></img>
            )
        }
    }

    renderInsight = () => {
        if(window.location.pathname === '/dashboard'){
            return (
                <h5>My best advice: {this.props.plant.insight}</h5>
            )
        }else if(window.location.pathname === '/feed'){
            return (
                <h5>Best insight from {this.props.plant.user_name}: {this.props.plant.insight}</h5>
            )
        }
    }

    render() {
        const { id, common_name, user_icon, plant_name, image_url, personality, story_notes, difficulty, moisture, sunlight, user_likes } = this.props.plant

        return (
            <div className="plant-card">
                {this.renderUserIcon()}
                <h2>{common_name} - {plant_name}</h2>
                <br></br>
                <p>difficulty: {difficulty}</p>
                <p>moisture: {moisture}</p>
                <p>sunlight: {sunlight}</p>
                <br></br>
                <p>Personality: {personality}</p>
                <p>Story/Notes: {story_notes}</p>
                {this.renderInsight()}
                {this.renderCardType()}
            </div>
        );
    }
}

export default PlantCard;
