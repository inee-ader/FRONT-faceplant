import React, { Component } from 'react';
import Comment from './Comment'

class CommentContainer extends Component {

    makeComments = () => {
        // console.log(this.props.comments)
        if(this.props.comments.length){
            let sortedComments = this.props.comments.sort((a,b)=>(a.id < b.id ? 1 : -1))
            return sortedComments.map(comment => {
                return <Comment user={this.props.user} 
                                key={comment.id} 
                                makeComments={this.props.makeComments} comment={comment}
                                removeComment={this.props.removeComment}/>
            })
        }else{
            if(this.props.user.id !== this.props.plant.user_id){
                return <h4 className="no-comments-yet">Be the first to comment on this beauty!</h4>
            }else{
                null
            }
        }
    }

    render() {
        return (
            <div className="comment-container">
                <div className="show-btn-div-bottom">
                    <button className="show-dashboard-btn" onClick={() => this.props.dashboardClick()}>Dashboard</button>
                    <button className="show-greenhouse-btn" onClick={() => this.props.handleFeedClick()}>Greenhouse</button>
                </div>
                {this.makeComments()}
            </div>
        );
    }
}

export default CommentContainer;
