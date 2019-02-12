import React from 'react';
import { connect } from 'react-redux';
import { DEFAULT_POST_SORT_METHOD } from '../actions/shared';
import { setPostSortMethod } from '../actions/postSorting';
import PostTeaser from './PostTeaser';

function PostListing({ posts, postSorting, onSortMethodChange }) {
  // sort posts by sort method and return only ids
  const postIds = posts
    .slice()
    .sort((a, b) => b[postSorting] - a[postSorting])
    .map(post => post.id);

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
            onChange={e => onSortMethodChange(e.target.value)}
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
  );
}

function mapStateToProps({ postSorting }, { posts }) {
  return {
    posts,
    postSorting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSortMethodChange: newSorting => {
      dispatch(setPostSortMethod(newSorting));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListing);
