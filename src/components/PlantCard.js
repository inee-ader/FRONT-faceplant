import React, { Component } from 'react';
 

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com/'
const LOCAL = 'http://localhost:3000'

class PlantCard extends Component {

    state = {
        hovered: false
    }

    handleDeleteClick = () => {
        this.props.handleDeletePlant(this.props.plant.id)
    }

    handleLikeClick = (id) => {
        this.props.handleLikePlant(id)
    }

    renderCardButton = () => {
        if(window.location.pathname === '/dashboard'){
            return (
                <div className="delete-btn-div" >
                    <button className="adore-btn" onClick={() => this.handleDeleteClick()}>Delete {this.props.plant.plant_name}?</button>
                </div>
            )
        }else if(window.location.pathname === '/feed'){
            // check plant's user_likes and if I'm NOT in there, render button
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

    renderCardClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-card-dashboard"
        }else if(window.location.pathname === '/feed'){
            return "plant-card-feed"
        }
    }

    renderImageClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-image-dashboard"
        }else if(window.location.pathname === '/feed'){
            return "plant-image-feed"
        }
    }

    renderHoverInfo = () => {
        //add state to card of hovered: true/false 
        // if true display info OVER image
        // if false just picture

        // look at "hidden" style for p tags
    }

    setHovered = () => {
        this.setState({
            hovered: true
        }, () => console.log(this.state.hovered))
    }

    setUnhovered = () => {
        this.setState({
            hovered: false
        }, () => console.log(this.state.hovered))
    }

    plantData = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-data-dash"
        }else if(window.location.pathname === '/feed'){
            return "plant-data-feed"
        }
    }

    render() {
        const { common_name, plant_name, personality, story_notes, difficulty, moisture, sunlight, image } = this.props.plant

        return (
            <div className={this.renderCardClass()} >
                <p>{this.renderUserIcon()} Plant's name: {plant_name}</p>
                <h2>{common_name}</h2>
                <div className="plant-card-div">
                    <img className={this.renderImageClass()} src={LOCAL + '/' + image} onMouseEnter={() => this.setHovered()} onMouseLeave={() => this.setUnhovered()}/>
                    <div className={this.plantData()}>
                        {/* <p>difficulty: {difficulty} | moisture: {moisture} | sunlight: {sunlight}</p>
                        <p>Personality: {personality}</p>
                        <p>Story/Notes: {story_notes}</p>
                        {this.renderInsight()}  */}
                        {this.renderCardButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlantCard;
