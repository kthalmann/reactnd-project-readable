import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils'

class CategoryNavigation extends Component {
  render() {
    console.log(this.props)
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
                  <Link to={`/${category.name}`}>
                    {capitalize(category.name)}
                  </Link>
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

export default connect(mapStateToProps)(CategoryNavigation)
