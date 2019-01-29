import React, { Component } from 'react'
// import { handleReceiveCommentsForPost } from '../actions/comments'
import { connect } from 'react-redux'
import {
  _getCommentsForPost,
  _voteOnComment,
  _addComment,
  _deleteComment
} from '../utils/api'
import CommentListing from './CommentListing'
import ShowPost from './ShowPost'
import CommentForm from './CommentForm'
import { generateUID } from '../utils/uid'

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

  /**
   * @param author
   * @param body
   */
  handleCreateComment = (author, body) => {
    // build new comment object
    const newComment = {
      id: generateUID(),
      timestamp: +Date.now(),
      body,
      author,
      parentId: this.props.postId
    }

    _addComment(newComment).then(newComment => {
      // add new comment returned from server to state
      this.setState(previousState => ({
        comments: previousState.comments.concat(newComment)
      }))
    })
  }

  handleUpdateComment = (commentId, author, body) => {
    console.log('handle update comment', commentId, body)
  }

  /**
   * @param commentId
   */
  handleDeleteComment = commentId => {
    _deleteComment(commentId).then(
      this.setState(previousState => ({
        comments: previousState.comments.filter(
          comment => comment.id !== commentId
        )
      }))
    )
  }

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

  handleEditComment = commentId => {
    this.setState(previousState => ({
      ...previousState,
      isCommentFormVisible: true,
      commentEditing: commentId
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
          onEdit={this.handleEditComment}
          onDelete={this.handleDeleteComment}
        />
        {this.state.isCommentFormVisible && (
          <CommentForm
            comment={this.state.comments.find(
              comment => comment.id === this.state.commentEditing
            )}
            onClose={this.handleCloseCommentForm}
            onCreate={this.handleCreateComment}
            onUpdate={this.handleUpdateComment}
          />
        )}
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
