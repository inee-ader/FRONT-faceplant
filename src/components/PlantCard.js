import React, { Component } from 'react';


const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
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

    handleUnlikeClick = (id) => {
        this.props.handleUnlikePlant(id)
    }

    handleShowClick = (plant) => {
        // console.log("plant clicked: ", plant)
        this.props.setShownPlant(plant)
        this.props.showPlant(plant)
    }

    // whether button is adore/unadore on feed or delete on dashboard
    renderCardButton = () => {
        if(window.location.pathname === '/greenhouse'){
            let like = this.props.plant.likes.find(like => like.user_id === this.props.user.id)
            // if user has already liked this plant
            if(like){
                return (
                    <div className="adore-btn-container">
                        <div className="adore-btn-div">
                            <button className="unadore-btn" onClick={() => this.handleUnlikeClick(like)}>Un-Adore</button>
                        </div>
                        <div>
                            <p className="adoring-p">{this.props.plant.likes.length} adoring this plant</p>
                        </div>
                    </div>
                )
            }
            // if user hasn't liked this plant yet
            else{
                return (
                    <div className="adore-btn-container">
                        <div className="adore-btn-div">
                            <button className="adore-btn" onClick={() => this.handleLikeClick(this.props.plant.id)}>Adore</button>
                        </div>
                        <div>
                            <p className="adoring-p">{this.props.plant.likes.length} adoring this plant</p>
                        </div>
                    </div>
                )
            }
        }else{
            null
        }
    }
    
    countComments = () => {
        let count = this.props.plant.comments.length
        return (
            <p className="comment-count">{count} comment(s) on this beaut!</p>
        )
    }
    // whether the icon is shown or not on feed card
    renderUserIcon = () => {
        if(window.location.pathname=== "/greenhouse"){
            return (
                <img 
                    className="user-feed-icon" 
                    alt={this.props.plant.user.username} 
                    src={this.props.plant.user_icon}
                ></img>
            )
        }
    }

    // whether the card is styled for feed or dashboard
    renderCardClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-card-dashboard"
        }else if(window.location.pathname === '/greenhouse'){
            return "plant-card-feed"
        }
    }
    // whether the plant image is styled for feed or dashboard
    renderImageClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-image-dashboard"
        }else if(window.location.pathname === '/greenhouse'){
            return "plant-image-feed"
        }
    }

    plantData = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-data-dash"
        }else if(window.location.pathname === '/greenhouse'){
            return "plant-data-feed"
        }
    }

    cardOrientation = () => {
        const { common_name, plant_name, personality, story_notes, difficulty, moisture, sunlight, image, insight, user_name} = this.props.plant

        if(window.location.pathname === '/dashboard'){
            return (
                <div>
                    {plant_name ? (<p className="plant-name" >"{plant_name}"</p>) : <br></br>}
                    <h2 className="card-common-name" onClick={() => this.handleShowClick(this.props.plant)}>{common_name}</h2>
                    <div>
                        <img 
                            className={this.renderImageClass()} 
                            src={LOCAL + '/' + image} 
                        />
                            {this.renderCardButton()}
                    </div>
                </div>
            )
        }else if(window.location.pathname === '/greenhouse'){
            return (
                <div className="card-inner-div">
                    <div className="card-image-name">
                        <img 
                            className={this.renderImageClass()} 
                            src={LOCAL + '/' + image} 
                        />
                        <p className="tended-by">Tended by {user_name}</p>
                    </div>
                    <div className={this.plantData()}>
                        <div className="card-top-feed">
                            <h2 className="card-common-name" onClick={() => this.handleShowClick
                            (this.props.plant)}> {common_name}</h2>
                            {this.renderUserIcon()}
                        </div>
                        {plant_name ? (<h4 className="plant-name" >"{plant_name}"</h4>) : <br></br>}
                        {this.renderCardButton()}
                        {this.countComments()}
                    </div>
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

