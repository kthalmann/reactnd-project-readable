import React, { Fragment } from 'react'
import Comment from './Comment'

export default function CommentListing({ comments }) {
  return (
    <Fragment>
      <h3>Comments</h3>
      <div className="comment-listing child-borders">
        {comments.map(comment => <Comment comment={comment} />)}
      </div>
    </Fragment>
  )
}
