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
                // need to clear form and persist the new comment with refresh

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
                    <button className="comment-btn" type="submit">Submit</button>
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

    // showUserClick = (user) => {
    //     // console.log("tended by: ", user)
    //     this.props.history.push(`/show_user/${user.id}`)
    //     this.props.setUserShow(user)
    // }

    render() {
        const {common_name, plant_name, insight, difficulty, moisture, sunlight, image, id, personality, story_notes, user_name, user_icon} = this.props.plant
        return (
            <div>
                <div className="show-plant-div">
                    <img
                        className="plant-show-image" 
                        src={LOCAL + '/' + image} 
                        />
                    <div className="show-plant-data">
                        <div className="show-plant-heading" >
                            {plant_name ? (<p className="show-plant-name" >{plant_name}</p>) : <br></br>}
                            <p className="plant-show-user">Tended by {user_name}</p>
                            <img 
                                className="show-plant-icon"
                                src={user_icon}
                                // onClick={() => this.showUserClick(this.props.plant.user)}
                            />
                        </div>
                        <h4 className="p-stats">difficulty: {difficulty} | 
                                moisture: {moisture} | 
                                sunlight: {sunlight}</h4>
                        {personality ? (<p className="show-plant-info">Personality: {personality}</p>) : <br></br>}
                        {story_notes ? (<p className="show-plant-info">Story/Notes: {story_notes}</p>) : <br></br>}
                        <p className="show-plant-info">Best insight from {user_name}: {insight}</p>
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
