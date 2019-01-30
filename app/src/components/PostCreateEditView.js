import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'

class PostCreateEditView extends Component {
  render() {
    console.log(this.props)

    const isNewPost = !this.props.post

    return (
      <div>
        <h1>{isNewPost ? 'New' : 'Edit'} Post</h1>
        <PostForm post={this.props.post} />
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
