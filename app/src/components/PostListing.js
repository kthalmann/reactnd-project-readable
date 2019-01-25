import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostListing extends Component {
  render() {
    return (
      <div className="post-listing">
        <div className="post-listing__header row flex-edges flex-middle">
          <h2 className="post-listing__title">Posts</h2>
          <div className="post-listing__sorting form-group">
            <label htmlFor="sortMethod">Sort by:</label>
            <select
              id="sortMethod"
              value={this.props.postSortMethod}
              onChange={e => this.onChange(e.target.value)}
            >
              <option value="timestamp">Age</option>
              <option value="score">Score</option>
            </select>
          </div>
        </div>
        {this.props.postIds.map(post => <div key={post}>{post}</div>)}
      </div>
    )
  }
}

function mapStateToProps({ postSortMethod }) {
  return {
    postSortMethod
  }
}

export default connect(mapStateToProps)(PostListing)
