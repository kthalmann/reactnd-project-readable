import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import PostListingView from './PostListingView';
import PostDetailView from './PostDetailView';
import PostCreateEditView from './PostCreateEditView';
import CategoryNavigation from './CategoryNavigation';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {this.props.loading === true ? null : (
              <Fragment>
                <CategoryNavigation />
                <Switch>
                  <Route path="/" exact component={PostListingView} />
                  <Route path="/post/new" component={PostCreateEditView} />
                  <Route path="/post/:id/edit" component={PostCreateEditView} />
                  <Route path="/:category/:postId" component={PostDetailView} />
                  <Route path="/:category" component={PostListingView} />
                </Switch>
              </Fragment>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    loading: !posts
  };
}

export default connect(mapStateToProps)(App);
