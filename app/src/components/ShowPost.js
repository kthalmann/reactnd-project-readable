import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostActions from './PostActions'

class ShowPost extends Component {
  render() {
    const {
      id,
      title,
      body,
      author,
      timestamp,
      voteScore,
      commentCount
    } = this.props.post

    return (
      <article className="post article">
        <h1 className="article-title">{title}</h1>
        <p className="article-meta">
          Written by #{author} on {timestamp}
        </p>
        <p>{body}</p>
        <PostActions
          postId={id}
          voteScore={voteScore}
          commentCount={commentCount}
        />
      </article>
    )
  }
}

function mapStateToProps({ posts }, props) {
  return {
    post: posts[props.postId]
  }
}

export default connect(mapStateToProps)(ShowPost)
