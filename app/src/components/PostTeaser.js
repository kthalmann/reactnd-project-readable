import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostActions from './PostActions'

class PostTeaser extends Component {
  render() {
    const { title, author, voteScore, commentCount } = this.props.post
    return (
      <div className="post-teaser card">
        <div className="card-body">
          <h4 className="post-teaser__title card-title">{title}</h4>
          <h5 className="post-teaser__author card-subtitle">{author}</h5>
        </div>
        <div className="post-teaser__footer card-footer">
          <PostActions voteScore={voteScore} commentCount={commentCount} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }, { postId }) {
  return {
    post: posts[postId]
  }
}

export default connect(mapStateToProps)(PostTeaser)
