import React, { Component } from 'react'
import { format } from 'timeago.js'

class Comment extends Component {
  render() {
    const { timestamp, author, body } = this.props.comment

    return (
      <div className="comment card shadow shadow-small">
        <div className="card-body">
          <div className="comment__meta card-subtitle">
            <span className="comment__author text-secondary">#{author}</span>
            <span className="comment__date text-muted">
              {format(timestamp)}
            </span>
          </div>
          <div className="comment__body">{body}</div>
        </div>
        <div className="card-footer">Comment actions</div>
      </div>
    )
  }
}

export default Comment
