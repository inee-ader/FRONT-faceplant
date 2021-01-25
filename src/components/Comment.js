import axios from 'axios';
import React, { Component } from 'react';

const HEROKU = 'https://peaceful-varahamihira-8367f0.netlify.app'
const LOCAL = 'http://localhost:3000'

class Comment extends Component {

    renderDeleteButton = () => {
        if(this.props.user.id === this.props.comment.user_id){
            return (
                <button className="delete-comment-btn" onClick={() => this.handleDelete(this.props.comment.id)}>Delete</button>
            )
        }
    }

    renderCommentDate = () => {
        const date = this.props.comment.created_at.slice(0,10).split('-')
        return `${date[1]}-${date[2]}-${date[0]}`
    }

    handleDelete = (id) => {
        axios.delete(LOCAL + `comments/${id}`)
    }

    render() {
        return (
            <div className="comment-card">   
                <img className="user-icon-comment" alt={this.props.comment.user_name} src={this.props.comment.user_icon}></img>
                <p className="comment-p">{this.props.comment.user_name} - {this.props.comment.content} {this.renderDeleteButton()} {this.renderCommentDate()} </p>
            </div>
        );
    }

}

export default Comment;
