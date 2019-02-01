import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PostListingView from './PostListingView'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostDetailView from './PostDetailView'
import PostCreateEditView from './PostCreateEditView'
import CategoryNavigation from './CategoryNavigation'

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
              <CategoryNavigation />
              <Switch>
                <Route path="/" exact component={PostListingView} />
                <Route path="/post/new" component={PostCreateEditView} />
                <Route path="/post/:id/edit" component={PostCreateEditView} />
                <Route path="/post/:id" component={PostDetailView} />
                <Route path="/:category" component={PostListingView} />
              </Switch>
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
