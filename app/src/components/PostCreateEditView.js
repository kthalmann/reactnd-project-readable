import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import Page404 from './404'

class PostCreateEditView extends Component {
  render() {
    const { post, location } = this.props

    // Requested post not found => 404
    if (post === undefined) {
      return <Page404 />
    }

    let params = new URLSearchParams(location.search)

    const isNewPost = !post

    return (
      <div>
        <h1>{isNewPost ? 'New' : 'Edit'} Post</h1>
        <PostForm post={post} category={params.get('category') || ''} />
      </div>
    )
  }
}

function mapStateToProps({ posts }, props) {
  const postId = props.match.params.id || null

  return {
    post: postId ? posts[postId] : null // if postId doesn't match any existing posts the post variable will be "undefined"
  }
}

export default connect(mapStateToProps)(PostCreateEditView)
