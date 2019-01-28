import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostActions from './PostActions'
import { Link, withRouter } from 'react-router-dom'

class PostTeaser extends Component {
  render() {
    const { id, title, author, voteScore, commentCount } = this.props.post
    return (
      <div className="post-teaser card">
        <Link to={`/post/${id}`} className="card-body">
          <h4 className="post-teaser__title card-title">{title}</h4>
          <h5 className="post-teaser__author card-subtitle">{author}</h5>
        </Link>
        <div className="post-teaser__footer card-footer">
          <PostActions
            postId={id}
            voteScore={voteScore}
            commentCount={commentCount}
          />
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

export default withRouter(connect(mapStateToProps)(PostTeaser))
