import React from 'react';
import { connect } from 'react-redux';
import PostListing from './PostListing';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils';

function PostListingView({ posts, category }) {
  return (
    <div className="post-listing-view">
      <div className="row flex-center">
        <Link
          to={{
            pathname: '/post/new',
            search: category ? `?category=${category}` : null
          }}
          className="paper-btn btn-primary"
        >
          New Post {category && `in «${capitalize(category)}»`}
        </Link>
      </div>
      <hr />
      <PostListing posts={posts} category={category} />
    </div>
  );
}

function mapStateToProps({ posts }, props) {
  const category = props.match.params.category || null;

  // make array
  posts = Object.keys(posts).map(postId => posts[postId]);

  if (category) {
    // if category is set -> filter by category
    posts = posts.filter(post => post.category === category);
  }

  return {
    category,
    posts
  };
}

export default connect(mapStateToProps)(PostListingView);
