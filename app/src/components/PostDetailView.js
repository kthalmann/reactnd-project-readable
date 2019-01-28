import React, { Component } from 'react'
// import { handleReceiveCommentsForPost } from '../actions/comments'
import { connect } from 'react-redux'
import { _getCommentsForPost } from '../utils/api'
import CommentListing from './CommentListing'
import ShowPost from './ShowPost'
import CommentForm from './CommentForm'
import { _voteOnComment } from '../utils/api'

class PostDetailView extends Component {
  state = {
    isLoading: true,
    isCommentFormVisible: false,
    commentEditing: null,
    comments: []
  }

  componentDidMount() {
    _getCommentsForPost(this.props.postId).then(comments => {
      this.setState(previousState => ({
        comments,
        isLoading: false
      }))
    })

    // this.props.dispatch(handleReceiveCommentsForPost(this.props.postId))
  }

  handleAddComment = () => {}

  handleEditComment = (commentId, body) => {}

  /**
   * @param commentId
   * @param thumbsUp
   */
  handleVoteOnComment = (commentId, thumbsUp) => {
    this.setState(previousState => ({
      ...previousState,
      comments: previousState.comments.map(comment => {
        if (comment.id === commentId) {
          comment.voteScore = thumbsUp
            ? comment.voteScore + 1
            : comment.voteScore - 1
        }

        return comment
      })
    }))

    _voteOnComment(commentId, thumbsUp).then(res => {
      console.log(res)
    })
  }

  handleAddComment = () => {
    this.setState(previousState => ({
      ...previousState,
      isCommentFormVisible: true
    }))
  }

  handleCloseCommentForm = () => {
    this.setState(previousState => ({
      ...previousState,
      isCommentFormVisible: false,
      commentEditing: null
    }))
  }

  render() {
    return (
      <div>
        <ShowPost
          postId={this.props.postId}
          onAddComment={this.handleAddComment}
        />
        <hr />
        <CommentListing
          comments={this.state.comments}
          loading={this.state.isLoading}
          onVote={this.handleVoteOnComment}
        />
      </div>
    )
  }
}

function mapStateToProps({}, props) {
  return {
    postId: props.match.params.id
  }
}

export default connect(mapStateToProps)(PostDetailView)
