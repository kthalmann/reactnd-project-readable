import React, { Fragment } from 'react'
import Comment from './Comment'

export default function CommentListing({
  comments,
  loading,
  onVote,
  onEdit,
  onDelete
}) {
  return (
    <Fragment>
      <h3>Comments</h3>
      <div className="comment-listing child-borders">
        {loading && <div>loading...</div>}
        {comments.map(comment => (
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
