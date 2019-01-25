import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FiHeart,
  FiArrowUp,
  FiArrowDown,
  FiMessageCircle,
  FiEdit,
  FiTrash,
  FiTrash2
} from 'react-icons/fi'

class PostActions extends Component {
  onUpvote = _ => {}

  render() {
    const { voteScore, commentCount } = this.props

    return (
      <div className="post-actions">
        <button className="post-actions__likes btn-link">
          <FiHeart />
          {voteScore}
        </button>

        <button className="post-actions__upvote btn-link">
          <FiArrowUp />
        </button>

        <button className="post-actions__downvote btn-link">
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
