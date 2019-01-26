import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PostListingView from './PostListingView'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className="container">
          {this.props.loading === true ? null : (
            <div>
              <Route path="/" exact component={PostListingView} />
              <Route path="/:category" component={PostListingView} />
            </div>
          )}
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: !posts
  }
}

export default connect(mapStateToProps)(App)
