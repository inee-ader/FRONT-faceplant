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
        if(window.location.pathname === '/feed'){
            let like = this.props.plant.likes.find(like => like.user_id === this.props.user.id)
            if(like){
                return (
                    <div id="adore-btn-p">
                        <div className="adore-btn-div">
                            <button className="unadore-btn" onClick={() => this.handleUnlikeClick(like)}>Un-Adore</button>
                        </div>
                        <div>
                            <p>{this.props.plant.likes.length} people adore this plant</p>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div id="adore-btn-p">
                        <div className="adore-btn-div">
                            <button className="adore-btn" onClick={() => this.handleLikeClick(this.props.plant.id)}>Adore</button>
                        </div>
                        <div>
                            <p>{this.props.plant.likes.length} people adore this plant</p>
                        </div>
                    </div>
                )
            }
        }else{
            null
        }
    }
    // whether the icon is shown or not on feed card
    renderUserIcon = () => {
        if(window.location.pathname=== "/feed"){
            return (
                <img 
                    className="user-feed-icon" 
                    alt={this.props.plant.user_name} 
                    src={this.props.plant.user_icon}
                    onClick={() => this.clickUserIcon(this.props.plant.user)}
                    ></img>
            )
        }
    }
    clickUserIcon = (user) => {
        // console.log("tended by: ", user)
        this.props.setUserShow(user)
        this.props.showUser(user)
    }
    // whether the card is styled for feed or dashboard
    renderCardClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-card-dashboard"
        }else if(window.location.pathname === '/feed'){
            return "plant-card-feed"
        }
    }
    // whether the plant image is styled for feed or dashboard
    renderImageClass = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-image-dashboard"
        }else if(window.location.pathname === '/feed'){
            return "plant-image-feed"
        }
    }

    // setHovered = () => {
    //     const {difficulty, moisture, sunlight, personality, story_notes} = this.props.plant
    //     this.setState({
    //         hovered: true
    //     }, () => console.log(this.state.hovered))
    //     return (
    //         <div className={this.plantData()}>
    //             <p>difficulty: {difficulty} | 
    //                 moisture: {moisture} | 
    //                 sunlight: {sunlight}</p>
    //             <p>Personality: {personality}</p>
    //             <p>Story/Notes: {story_notes}</p>
    //         </div>
    //     )
    // }

    // setUnhovered = () => {
    //     this.setState({
    //         hovered: false
    //     }, () => console.log(this.state.hovered))
    // }

    plantData = () => {
        if(window.location.pathname === '/dashboard'){
            return "plant-data-dash"
        }else if(window.location.pathname === '/feed'){
            return "plant-data-feed"
        }
    }

    cardOrientation = () => {
        const { common_name, plant_name, personality, story_notes, difficulty, moisture, sunlight, image, insight, user_name} = this.props.plant

        if(window.location.pathname === '/dashboard'){
            return (
                <div>
                    <p className="plant-name" >{this.renderUserIcon()} | {plant_name} |</p>
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
        }else if(window.location.pathname === '/feed'){
            return (
                <div className="card-inner-div">
                    <div className="card-image-name">
                        <img 
                            className={this.renderImageClass()} 
                            src={LOCAL + '/' + image} 
                        />
                    </div>
                    <div className={this.plantData()}>
                        <div className="card-top-feed">
                            <h2 className="card-common-name" onClick={() => this.handleShowClick
                            (this.props.plant)}> {common_name}</h2>
                            {this.renderUserIcon()}
                        </div>
                        {plant_name ? (<h4 className="plant-name" >{plant_name}</h4>) : <br></br>}
                        {this.renderCardButton()}
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

