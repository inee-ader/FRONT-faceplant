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

    handleUnLikeClick = (id) => {
        this.props.handleUnlikePlant(id)
    }

    renderCardButton = () => {
        if(window.location.pathname === '/dashboard'){
            return (
                <div className="delete-btn-div" >
                    <button className="delete-btn" onClick={() => this.handleDeleteClick()}>Delete?</button>
                </div>
            )
        }else if(window.location.pathname === '/feed'){
            if(this.props.plant.user_likes.find(user => user.id === this.props.user.id)){
                return (
                    <div id="adore-btn-p">
                        <div className="adore-btn-div">
                            <button className="unadore-btn" onClick={() => this.handleUnLikeClick(this.props.plant.id)}>Un-Adore</button>
                        </div>
                        <br/>
                        <div>
                            <p>{this.props.plant.user_likes.length} people adore this plant</p>
                        </div>
                    </div>
                )
            }else{
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
            }
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
    cardOrientation = () => {
        const { common_name, plant_name, personality, story_notes, difficulty, moisture, sunlight, image } = this.props.plant

        if(window.location.pathname === '/dashboard'){
            return (
                <div>
                    <p>{this.renderUserIcon()} Plant's name | {plant_name}</p>
                    <h2>{common_name}</h2>
                    <div>
                        <img 
                            className={this.renderImageClass()} 
                            src={LOCAL + '/' + image} 
                            onMouseEnter={() => this.setHovered()} 
                            onMouseLeave={() => this.setUnhovered()}/>
                        <div className={this.plantData()}>
                            <p>difficulty: {difficulty} | 
                                moisture: {moisture} | 
                                sunlight: {sunlight}</p>
                            <p>Personality: {personality}</p>
                            <p>Story/Notes: {story_notes}</p>
                            {this.renderInsight()} 
                            {this.renderCardButton()}
                        </div>
                    </div>
                </div>
            )
        }else if(window.location.pathname === '/feed'){
            return (
                <div className="card-inner-div">
                    <div className="card-image-name">
                        <img 
                            className={this.renderImageClass()} 
                            src={LOCAL + '/' + image} 
                            onMouseEnter={() => this.setHovered()} 
                            onMouseLeave={() => this.setUnhovered()}/>
                        <p>difficulty: {difficulty} | 
                            moisture: {moisture} | 
                            sunlight: {sunlight}</p>
                    </div>
                    <div className={this.plantData()}>
                        <h2 className="card-headline-feed"> {common_name} {this.renderUserIcon()}</h2>
                        
                        {plant_name ? (<h4>{plant_name}</h4>) : <br></br>}
                        <p>Personality: {personality}</p>
                        <p>Story/Notes: {story_notes}</p>
                        {this.renderInsight()} 
                        {this.renderCardButton()}
                    </div>
                    {/* <div>
                        <div className={this.plantData()}>
                            <p>difficulty: {difficulty} | moisture: {moisture} | sunlight: {sunlight}</p>
                            <p>Personality: {personality}</p>
                            <p>Story/Notes: {story_notes}</p>
                            {this.renderInsight()} 
                            {this.renderCardButton()}
                        </div>
                    </div> */}
                </div>
            )
        }
    }

    render() {
       

        return (
            <div className={this.renderCardClass()}>
                {this.cardOrientation()}
            </div>
        );
    }
}

export default PlantCard;
