import React from 'react'
import { FormattedRelative } from 'react-intl'
import CommentActions from './CommentActions'

function Comment({ comment, onVote, onEdit, onDelete }) {
  return (
    <div className="comment card shadow shadow-small">
      <div className="card-body">
        <div className="comment__meta card-subtitle">
          <span className="comment__author text-secondary">
            #{comment.author}
          </span>
          <span className="comment__date text-muted">
            <FormattedRelative value={comment.timestamp} />
          </span>
        </div>
        <div className="comment__body">{comment.body}</div>
      </div>
      <div className="card-footer">
        <CommentActions
          commentId={comment.id}
          voteScore={comment.voteScore}
          onVote={onVote}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default Comment
