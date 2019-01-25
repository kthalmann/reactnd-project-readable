import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListing from './PostListing'

class PostListingView extends Component {
  render() {
    return (
      <div className="post-listing-view">
        Category Navigation
        <hr />
        Button add post
        <hr />
        <PostListing postIds={this.props.postIds} />
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  let category = null
  if (props.match) {
    category = props.match.params.category
  }

  return {
    category,
    postIds: Object.keys(posts).sort(
      (a, b) => posts[b].timestamp - posts[a].timestamp
    )
  }
}

export default connect(mapStateToProps)(PostListingView)
