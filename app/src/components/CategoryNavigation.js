import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { capitalize } from '../utils'

class CategoryNavigation extends Component {
  render() {
    return (
      <nav className="category-nav border fixed split-nav">
        <div className="nav-brand">
          <h3>
            <Link to="/">Readable</Link>
          </h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <button>
            <label htmlFor="collapsible1">
              <div className="bar1" />
              <div className="bar2" />
              <div className="bar3" />
            </label>
          </button>
          <div className="collapsible-body">
            <ul className="inline">
              {this.props.categories.map(category => (
                <li key={category.name}>
                  <NavLink
                    to={`/${category.name}`}
                    className="category-nav__link"
                    activeClassName="active"
                  >
                    {capitalize(category.name)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map(
      categoryId => categories[categoryId]
    )
  }
}

export default withRouter(connect(mapStateToProps)(CategoryNavigation))
