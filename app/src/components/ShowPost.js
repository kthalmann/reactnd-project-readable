import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostActions from './PostActions'
import { FormattedDate } from 'react-intl'

class ShowPost extends Component {
  render() {
    const {
      id,
      title,
      body,
      author,
      timestamp,
      voteScore,
      commentCount,
      category
    } = this.props.post

    return (
      <article className="post article">
        <h1 className="article-title">{title}</h1>
        <p className="article-meta">
          Written by <span className="text-secondary">#{author}</span> on{' '}
          <FormattedDate
            value={timestamp}
            day="numeric"
            month="long"
            year="numeric"
          />
        </p>
        <p>{body}</p>
        <div className="row">
          <button onClick={() => this.props.onAddComment()}>Add comment</button>
        </div>
        <PostActions
          postId={id}
          postCategory={category}
          voteScore={voteScore}
          commentCount={commentCount}
        />
      </article>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    post: posts[props.postId],
    onAddComment: props.onAddComment
  }
}

export default connect(mapStateToProps)(ShowPost)
