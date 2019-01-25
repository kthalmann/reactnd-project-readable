import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DEFAULT_POST_SORT_METHOD } from '../actions/shared'
import { setPostSortMethod } from '../actions/postSorting'

class PostListing extends Component {
  onChange = newSorting => {
    this.props.dispatch(setPostSortMethod(newSorting))
  }

  render() {
    return (
      <div className="post-listing">
        <div className="post-listing__header row flex-edges flex-middle">
          <h2 className="post-listing__title">Posts</h2>
          <div className="post-listing__sorting form-group">
            <label htmlFor="sortMethod">Sort by:</label>
            <select
              id="sortMethod"
              value={this.props.postSorting || DEFAULT_POST_SORT_METHOD}
              onChange={e => this.onChange(e.target.value)}
            >
              <option value="age">Age</option>
              <option value="score">Score</option>
            </select>
          </div>
        </div>
        {this.props.postIds.map(post => <div key={post}>{post}</div>)}
      </div>
    )
  }
}

function mapStateToProps({ postSorting }) {
  return {
    postSorting
  }
}

export default connect(mapStateToProps)(PostListing)
