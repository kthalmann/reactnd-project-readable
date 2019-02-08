import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DEFAULT_POST_SORT_METHOD } from '../actions/shared'
import { setPostSortMethod } from '../actions/postSorting'
import PostTeaser from './PostTeaser'

class PostListing extends Component {
  onChange = newSorting => {
    this.props.dispatch(setPostSortMethod(newSorting))
  }

  render() {
    const { posts, postSorting } = this.props

    // sort posts by sort method and return only ids
    const postIds = posts
      .sort((a, b) => b[postSorting] - a[postSorting])
      .map(post => post.id)

    return (
      <div className="post-listing">
        <div className="post-listing__header row flex-edges flex-middle">
          <h2 className="post-listing__title">Posts</h2>
          <div className="post-listing__sorting form-group">
            <label className="post-listing__sort-label" htmlFor="sortMethod">
              Sort by:
            </label>
            <select
              id="sortMethod"
              className="post-listing__sort-input"
              value={postSorting || DEFAULT_POST_SORT_METHOD}
              onChange={e => this.onChange(e.target.value)}
            >
              <option value="timestamp">Age</option>
              <option value="voteScore">Score</option>
            </select>
          </div>
        </div>
        {postIds.length === 0 && (
          <div className="alert alert-warning">No posts to display</div>
        )}
        {postIds.map(post => <PostTeaser key={post} postId={post} />)}
      </div>
    )
  }
}

function mapStateToProps({ postSorting }, { posts }) {
  return {
    posts,
    postSorting
  }
}

export default connect(mapStateToProps)(PostListing)
