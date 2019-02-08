import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostActions from './PostActions'
import { Link, withRouter } from 'react-router-dom'
import { FormattedDate } from 'react-intl'

class PostTeaser extends Component {
  render() {
    const {
      id,
      title,
      author,
      timestamp,
      voteScore,
      commentCount,
      category
    } = this.props.post
    return (
      <div className="post-teaser card">
        <Link to={`/${category}/${id}`} className="card-body">
          <h4 className="post-teaser__title card-title">{title}</h4>
          <p className="post-teaser__author">
            <span className="text-secondary">#{author}</span> on{' '}
            <FormattedDate
              value={timestamp}
              day="numeric"
              month="long"
              year="numeric"
            />
          </p>
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
