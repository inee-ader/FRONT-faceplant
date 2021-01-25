import React, { Component } from 'react';
import Comment from './Comment'

class CommentContainer extends Component {

    makeComments = () => {
        // console.log(this.props.comments)
        if(this.props.comments.length){
            return this.props.comments.map(comment => {
                return <Comment user={this.props.user} 
                                key={comment.id} 
                                makeComments={this.props.makeComments} comment={comment}
                                removeComment={this.props.removeComment}/>
            })
        }else{
            return <h4>Be the first to comment on this beauty!</h4>
        }
    }

   

    render() {
        return (
            <div className="comment-container">
                <button className="dashboard-btn" className="adore-btn" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                <button className="dashboard-btn" onClick={() => this.props.handleFeedClick()}>Greenhouse</button>
                {this.makeComments()}
            </div>
        );
    }
}

export default CommentContainer;
