import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  FiHeart,
  FiArrowUp,
  FiArrowDown,
  FiMessageCircle,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';
import {
  handleUpvotePost,
  handleDownvotePost,
  handleDeletePost
} from '../actions/posts';

class PostActions extends Component {
  onUpvote = _ => {
    this.props.dispatch(handleUpvotePost(this.props.postId));
  };
  onDownvote = _ => {
    this.props.dispatch(handleDownvotePost(this.props.postId));
  };
  onDelete = _ => {
    this.props.dispatch(
      handleDeletePost(this.props.postId, this.onDeleteCallbackHandler)
    );
  };

  /**
   * if detail page is showing -> go to home
   */
  onDeleteCallbackHandler = _ => {
    const { postId, postCategory, location, history } = this.props;

    if (location.pathname === `/${postCategory}/${postId}`) history.push('/');
  };

  render() {
    const { postId, voteScore, commentCount } = this.props;

    return (
      <div className="post-actions">
        <button className="post-actions__likes btn-link">
          <FiHeart />
          {voteScore}
        </button>

        <button
          className="post-actions__upvote btn-link"
          onClick={this.onUpvote}
        >
          <FiArrowUp />
        </button>

        <button
          className="post-actions__downvote btn-link"
          onClick={this.onDownvote}
        >
          <FiArrowDown />
        </button>

        <button className="post-actions__comment btn-link">
          <FiMessageCircle />
          {commentCount}
        </button>

        <button
          className="post-actions__delete btn-link"
          onClick={this.onDelete}
        >
          <FiTrash2 />
        </button>

        <Link
          to={`/post/${postId}/edit`}
          className="post-actions__edit btn-link text-primary"
        >
          <FiEdit />
        </Link>
      </div>
    );
  }
}

export default withRouter(connect()(PostActions));
