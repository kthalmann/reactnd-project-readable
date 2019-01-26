import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FiHeart,
  FiArrowUp,
  FiArrowDown,
  FiMessageCircle,
  FiEdit,
  FiTrash2
} from 'react-icons/fi'
import { downvotePost, upvotePost } from '../actions/posts'

class PostActions extends Component {
  onUpvote = _ => {
    this.props.dispatch(upvotePost(this.props.postId))
  }
  onDownvote = _ => {
    this.props.dispatch(downvotePost(this.props.postId))
  }

  render() {
    console.log(this.props)
    const { voteScore, commentCount } = this.props

    return (
      <div className="post-actions">
        <button className="post-actions__likes btn-link">
          <FiHeart />
          {voteScore}
        </button>

        <button
          className="post-actions__upvote btn-link"
          onClick={this.onUpvote}
        >
          <FiArrowUp />
        </button>

        <button
          className="post-actions__downvote btn-link"
          onClick={this.onDownvote}
        >
          <FiArrowDown />
        </button>

        <button className="post-actions__comment btn-link">
          <FiMessageCircle />
          {commentCount}
        </button>

        <button className="post-actions__delete btn-link">
          <FiTrash2 />
        </button>

        <button className="post-actions__edit btn-link">
          <FiEdit />
        </button>
      </div>
    )
  }
}

function mapStateToProps({ posts }, { postId }) {
  return {
    post: posts[postId]
  }
}

export default connect()(PostActions)
