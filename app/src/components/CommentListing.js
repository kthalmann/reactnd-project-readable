import React, { Fragment } from 'react'
import Comment from './Comment'

function CommentListing({ comments, loading, onVote, onEdit, onDelete }) {
  return (
    <Fragment>
      <h3>Comments</h3>
      {loading && <p style={{ textAlign: 'center' }}>loading...</p>}
      <div className="comment-listing child-borders">
        {comments
          .sort((a, b) => b.timestamp - a.timestamp)
          .map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onVote={onVote}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </div>
    </Fragment>
  )
}

export default CommentListing
