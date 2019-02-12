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
  /**
   * if detail page is showing -> go to home
   */
  onDeleteCallbackHandler = _ => {
    const { postId, postCategory, location, history } = this.props;

    if (location.pathname === `/${postCategory}/${postId}`) history.push('/');
  };

  render() {
    const {
      postId,
      voteScore,
      commentCount,
      onUpvote,
      onDownvote,
      onDelete
    } = this.props;

    return (
      <div className="post-actions">
        <button className="post-actions__likes btn-link">
          <FiHeart />
          {voteScore}
        </button>

        <button
          className="post-actions__upvote btn-link"
          onClick={() => onUpvote(postId)}
        >
          <FiArrowUp />
        </button>

        <button
          className="post-actions__downvote btn-link"
          onClick={() => onDownvote(postId)}
        >
          <FiArrowDown />
        </button>

        <button className="post-actions__comment btn-link">
          <FiMessageCircle />
          {commentCount}
        </button>

        <button
          className="post-actions__delete btn-link"
          onClick={() => onDelete(postId, this.onDeleteCallbackHandler)}
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

function mapDispatchToProps(dispatch) {
  return {
    onUpvote: id => {
      dispatch(handleUpvotePost(id));
    },
    onDownvote: id => {
      dispatch(handleDownvotePost(id));
    },
    onDelete: (id, cb) => {
      dispatch(handleDeletePost(id, cb));
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(PostActions));
