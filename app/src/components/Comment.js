import React, { Component } from 'react'
import { FormattedRelative } from 'react-intl'
import CommentActions from './CommentActions'

class Comment extends Component {
  render() {
    const { id, timestamp, author, body, voteScore } = this.props.comment
    const { onVote } = this.props

    return (
      <div className="comment card shadow shadow-small">
        <div className="card-body">
          <div className="comment__meta card-subtitle">
            <span className="comment__author text-secondary">#{author}</span>
            <span className="comment__date text-muted">
              <FormattedRelative value={timestamp} />
            </span>
          </div>
          <div className="comment__body">{body}</div>
        </div>
        <div className="card-footer">
          <CommentActions
            commentId={id}
            voteScore={voteScore}
            onVote={onVote}
          />
        </div>
      </div>
    )
  }
}

export default Comment
