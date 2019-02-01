import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'

class PostCreateEditView extends Component {
  render() {
    const { post, location } = this.props

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
    post: postId ? posts[postId] : null
  }
}

export default connect(mapStateToProps)(PostCreateEditView)
