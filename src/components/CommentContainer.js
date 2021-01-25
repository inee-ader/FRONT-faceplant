import React, { Component } from 'react';
import Comment from './Comment'

class CommentContainer extends Component {

    makeComments = () => {
        console.log(this.props.comments)
        if(this.props.comments.length){
            return this.props.comments.map(comment => {
                return <Comment user={this.props.user} key={comment.id} comment={comment}/>
            })
        }else{
            return <h3>Be the first to comment on this beauty!</h3>
        }
    }


    render() {
        return (
            <div className="comment-container">
                {this.makeComments()}
            </div>
        );
    }
}

export default CommentContainer;
