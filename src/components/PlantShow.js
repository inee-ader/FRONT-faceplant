import axios from 'axios';
import React, { Component } from 'react';
import CommentContainer from './CommentContainer'

const HEROKU = 'https://mighty-wildwood-93362.herokuapp.com'
const LOCAL = 'http://localhost:3000'

class PlantShow extends Component {

    state = {
            content: '', 
            comments: this.props.plant.comments
        }
    
    componentDidMount(){
        this.props.renderHeader()

    }
    getPlantComments = () => {

    }

    handleAddComment = (e) => {
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
            // console.log(response)
            if(response.data.status === 'created'){
                console.log(response.data.comment)
                this.setState(prevState => {
                    return {
                        comments: [response.data.comment, ...prevState.comments]
                    }
                })
                // clear input field 
            }
        }).catch(error => {
            console.log("add comment error: ", error)
        })
    }
    removeComment = (id) => {
        let newComments = this.state.comments.filter(comment => comment.id !== id)
        this.setState({
            comments: newComments
        })
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    dashboardClick = () => {
        this.props.history.push("/dashboard")
    }

    handleFeedClick = () => {
        this.props.history.push("/feed")
    }

    renderForm = () => {
        if(this.props.user.id !== this.props.plant.user_id){
            return (
                <form name="comment-form" className="comment-form" onSubmit={this.handleAddComment}>
                    <label htmlFor="comment">Give Compliment</label>
                    <textarea name="comment" placeholder="Write your adoring words here..." onChange={this.handleChange}></textarea>
                    <button className="adore-btn" type="submit">Submit</button>
                </form>
            )
        }
    }

    renderDeleteButton = () => {
        if(this.props.user.id === this.props.plant.user_id){
            return (
                <div className="delete-btn-div" >
                    <button className="delete-btn" onClick={() => this.handleDeleteClick()}>Delete?</button>
                </div>
            )
        }
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
                        {this.renderForm()}
                        {this.renderDeleteButton()}
                    </div> 
                </div>
                <CommentContainer 
                    handleFeedClick={this.handleFeedClick}
                    dashboardClick={this.dashboardClick}
                    user={this.props.user}
                    comments={this.state.comments}
                    removeComment={this.removeComment}/> 
            </div>
        );
    }
}

export default PlantShow;
