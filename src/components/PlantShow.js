import axios from 'axios';
import React, { Component } from 'react';
import CommentContainer from './CommentContainer'
import '../style/PlantShow.css'

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
                        comments: [response.data.comment, ...prevState.comments], 
                        content: ''
                    }
                }, localStorage.setItem("plantShow", JSON.stringify({...this.props.plant, comments: [response.data.comment, ...this.state.comments]}))
                )
            }
        }).catch(error => {
            console.log("add comment error: ", error)
        })
    }

    removeComment = (id) => {
        let newComments = this.state.comments.filter(comment => comment.id !== id)
        this.setState({
            comments: newComments
        }, localStorage.setItem("plantShow", JSON.stringify({...this.props.plant, comments: newComments})))
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
        this.props.history.push("/greenhouse")
    }
     
    handleDeleteClick = () => {
        this.props.handleDeletePlant(this.props.plant.id)
        this.props.history.push("/dashboard")
    }

    handleEditClick = () => {
        this.props.history.push("/edit_plant")
    }

    renderForm = () => {
        if(this.props.user.id !== this.props.plant.user_id){
            return (
                <form name="comment-form" className="comment-form" onSubmit={this.handleAddComment}>
                    <label className="comment-label" htmlFor="comment">Give Compliment</label>
                    <textarea value={this.state.content} className="comment-textarea" name="comment" placeholder="Write your adoring words here..." onChange={this.handleChange}></textarea>
                    <button className="submit-comment-btn" type="submit">Submit</button>
                </form>
            )
        }
    }

    renderDeleteButton = () => {
        if(this.props.user.id === this.props.plant.user_id){
            return (
                <div className="delete-btn-div" >
                    <button className="show-delete-plant-btn" onClick={() => this.handleDeleteClick()}>Delete?</button>
                    <button className="show-edit-plant-btn" onClick={() => this.handleEditClick()}>Edit Details</button>
                </div>
            )
        }
    }

    render() {
        const {common_name, plant_name, insight, difficulty, moisture, sunlight, image, id, personality, story_notes, user_name, user_icon} = this.props.plant
        return (
            <div className="show-page-div">
                <div className="show-btn-div-top">
                    <button className="show-dashboard-btn" onClick={() => this.dashboardClick()}>Dashboard</button>
                    <button className="show-greenhouse-btn" onClick={() => this.handleFeedClick()}>Greenhouse</button>
                </div>
                <div className="show-plant-div">
                    <img
                        className="show-plant-image" 
                        src={LOCAL + '/' + image} 
                        />
                    <div className="show-plant-data">
                        <div className="show-plant-heading" >
                            <div className="p-box">
                                {plant_name ? (<p className="show-plant-name" >{plant_name}</p>) : <br></br>}
                                <p className="show-plant-user">Tended by {user_name}</p>
                            </div>
                            <img 
                                className="show-plant-icon"
                                src={user_icon}
                            />
                        </div>
                        <p className="p-stats">
                            Difficulty {difficulty}  | 
                            Moisture {moisture}  | 
                            Sunlight {sunlight}</p>
                        {personality ? (<div><p className="show-plant-title">PERSONALITY </p><p className="info-p">{personality}</p></div>) : <br></br>}
                        {story_notes ? (<div><p className="show-plant-title">STORY/NOTES </p><p className="info-p">{story_notes}</p></div>) : <br></br>}
                        {insight ? (<div><p className="show-plant-title">INSIGHT </p><p className="info-p">{insight}</p></div>) : <br></br>}
                        
                        {this.renderForm()}
                        {this.renderDeleteButton()}
                    </div> 
                </div>
                <CommentContainer 
                    handleFeedClick={this.handleFeedClick}
                    dashboardClick={this.dashboardClick}
                    user={this.props.user}
                    comments={this.state.comments}
                    removeComment={this.removeComment}
                    plant={this.props.plant}/> 
            </div>
        );
    }
}

export default PlantShow;
