import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  _getCommentsForPost,
  _voteOnComment,
  _addComment,
  _deleteComment,
  _updateComment
} from '../utils/api'
import CommentListing from './CommentListing'
import ShowPost from './ShowPost'
import CommentForm from './CommentForm'
import { generateUID } from '../utils/index'
import { decreaseCommentCount, increaseCommentCount } from '../actions/posts'
import Page404 from './404'

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

    _addComment(newComment)
      .then(newComment => {
        // add new comment returned from server to state
        this.setState(previousState => ({
          comments: previousState.comments.concat(newComment),
          isCommentFormVisible: false
        }))

        this.props.dispatch(increaseCommentCount(this.props.postId))
      })
      .catch(_ =>
        alert(
          'An error occurred during creating the comment. Please refresh the page.'
        )
      )
  }

  /**
   *
   * @param commentId
   * @param body
   */
  handleUpdateComment = (commentId, body) => {
    // make copy of current state in case api call goes bad
    const resetState = JSON.parse(JSON.stringify(this.state))

    this.setState(previousState => ({
      isCommentFormVisible: false,
      commentEditing: null,
      comments: previousState.comments.map(comment => {
        if (comment.id === commentId) {
          comment.body = body
          comment.timestamp = +Date.now()
        }

        return comment
      })
    }))

    _updateComment(commentId, +Date.now(), body).catch(_ => {
      // if failed -> reset our state
      this.setState({
        ...resetState,
        isCommentFormVisible: false
      })
      alert(
        'An error occurred during updating the comment. Please refresh the page.'
      )
    })
  }

  /**
   * @param commentId
   */
  handleDeleteComment = commentId => {
    // make copy of current state in case api call goes bad
    const resetState = JSON.parse(JSON.stringify(this.state))

    this.setState(previousState => ({
      comments: previousState.comments.filter(
        comment => comment.id !== commentId
      )
    }))

    _deleteComment(commentId)
      .then(_ => this.props.dispatch(decreaseCommentCount(this.props.postId)))
      .catch(_ => {
        // if failed -> reset our state
        this.setState(resetState)
        alert(
          'An error occurred during deleting the comment. Please refresh the page.'
        )
      })
  }

  /**
   * @param commentId
   * @param thumbsUp
   */
  handleVoteOnComment = (commentId, thumbsUp) => {
    // make copy of current state in case api call goes bad
    const resetState = JSON.parse(JSON.stringify(this.state))

    this.setState(previousState => ({
      comments: previousState.comments.map(comment => {
        if (comment.id === commentId) {
          comment.voteScore = thumbsUp
            ? comment.voteScore + 1
            : comment.voteScore - 1
        }

        return comment
      })
    }))

    _voteOnComment(commentId, thumbsUp).catch(_ => {
      // if failed -> reset our state
      this.setState(resetState)
      alert('An error occurred during voting. Please refresh the page.')
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
    // No post => 404
    if (!this.props.post) {
      return <Page404 />
    }

    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    post: posts[props.match.params.postId],
    postId: props.match.params.postId
  }
}

export default connect(mapStateToProps)(PostDetailView)
