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
        <PostListing posts={this.props.posts} category={this.props.category} />
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const category = props.match.params.category || null

  // make array
  posts = Object.keys(posts).map(postId => posts[postId])

  if (category) {
    // if category is set -> filter by category
    posts = posts.filter(post => post.category === category)
  }

  return {
    category,
    posts
  }
}

export default connect(mapStateToProps)(PostListingView)
