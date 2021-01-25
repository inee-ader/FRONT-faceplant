import axios from 'axios';
import React, { Component } from 'react';
import CommentContainer from './CommentContainer'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class PlantShow extends Component {

    state = {
            content: ''
        }
    
    componentDidMount(){
        this.props.renderHeader()
        // console.log("plant shown: ", this.props.plant)
        // this.getShownPlant()
    }
    
    

    // getShownPlant = () => {
    //     const plantId = this.props.location.pathname.split('/')[2]
    //     if(!this.props.shown){
    //       this.props.getPlant(plantId)
    //     }
    //   }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(LOCAL + '/comments', {
            comment: {
                user_id: this.props.user.id, 
                user_icon: this.props.user.icon,
                user_name: this.props.user.username,
                user_plant_id: this.props.plant.id, 
                content: this.state.content
            }
        }, 
        {withCredentials: true}
        ).then(response => {
            console.log(response)
            if(response.data.status === 'created'){
                console.log(response.data.comment)
                const commentForm = document.getElementById('comment-form')
                commentForm.reset()
            }
        }).catch(error => {
            console.log("add comment error: ", error)
        })
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        const {common_name, plant_name, insight, difficulty, moisture, sunlight, image, id, personality, story_notes, user_name} = this.props.plant
        return (
            <div>
                <div className="show-plant-div">
                    <img
                        className="plant-show-image" 
                        src={LOCAL + '/' + image} 
                        />
                    <div className="show-plant-data">
                        {plant_name ? (<h2 className="show-plant-name" >{plant_name}</h2>) : <br></br>}
                        {personality ? (<h4>Personality: {personality}</h4>) : <br></br>}
                        {story_notes ? (<h4>Story/Notes: {story_notes}</h4>) : <br></br>}
                        <h4>difficulty: {difficulty} | 
                                moisture: {moisture} | 
                                sunlight: {sunlight}</h4>
                        <h4>Best insight from {user_name}: {insight}</h4>
                        <form className="comment-form" onSubmit={this.handleSubmit}>
                            <label htmlFor="comment">Give Comment</label>
                            <textarea name="comment" placeholder="Write your adoring words here..." onChange={this.handleChange}></textarea>
                            <button className="adore-btn" type="submit">Submit</button>
                        </form>
                    </div> 
                </div>
                <CommentContainer 
                    user={this.props.user}
                    comments={this.props.plant.comments}/> 
            </div>
        );
    }
}

export default PlantShow;
