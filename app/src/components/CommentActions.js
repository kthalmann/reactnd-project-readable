import React, { Component } from 'react'
import {
  FiHeart,
  FiArrowUp,
  FiArrowDown,
  FiEdit,
  FiTrash2
} from 'react-icons/fi'

class CommentActions extends Component {
  render() {
    const { commentId, voteScore, onVote } = this.props

    return (
      <div className="comment-actions">
        <button className="comment-actions__likes btn-link">
          <FiHeart />
          {voteScore}
        </button>

        <button
          className="comment-actions__upvote btn-link"
          onClick={() => onVote(commentId, true)}
        >
          <FiArrowUp />
        </button>

        <button
          className="comment-actions__downvote btn-link"
          onClick={() => onVote(commentId, false)}
        >
          <FiArrowDown />
        </button>

        <button className="comment-actions__delete btn-link">
          <FiTrash2 />
        </button>

        <button className="comment-actions__edit btn-link">
          <FiEdit />
        </button>
      </div>
    )
  }
}

export default CommentActions
