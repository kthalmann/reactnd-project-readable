import React, { Component } from 'react'
// import { handleReceiveCommentsForPost } from '../actions/comments'
import { connect } from 'react-redux'
import { _getCommentsForPost } from '../utils/api'
import CommentListing from './CommentListing'

class PostDetailView extends Component {
  state = {
    loading: true,
    comments: []
  }

  componentDidMount() {
    _getCommentsForPost(this.props.postId).then(comments => {
      console.log(comments)
      this.setState(previousState => ({
        comments,
        loading: false
      }))
    })

    // this.props.dispatch(handleReceiveCommentsForPost(this.props.postId))
  }

  render() {
    return (
      <div>
        Show Post
        <hr />
        {this.state.loading && <div>loading...</div>}
        <CommentListing comments={this.state.comments} />
      </div>
    )
  }
}

function mapStateToProps({}, props) {
  return {
    postId: props.match.params.id
  }
}

export default connect(mapStateToProps)(PostDetailView)
