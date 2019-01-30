import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostForm extends Component {
  state = {
    authorInput: '',
    titleInput: '',
    categoryInput: '',
    bodyInput: ''
  }

  constructor(props) {
    super(props)

    if (!this.props.post) return

    this.state = {
      authorInput: this.props.post.author,
      titleInput: this.props.post.title,
      categoryInput: this.props.post.category,
      bodyInput: this.props.post.body
    }
  }

  handleChange = e => {
    const field = e.target.name
    const value = e.target.value

    this.setState({
      [field]: value
    })
  }

  isSubmitable = _ => {
    const { authorInput, titleInput, categoryInput, bodyInput } = this.state

    return authorInput && titleInput && categoryInput && bodyInput
  }

  render() {
    const isNewPost = !this.props.post
    const { authorInput, titleInput, categoryInput, bodyInput } = this.state

    return (
      <div>
        <form
          action=""
          className="post-form background-primary border border-primary"
        >
          <div className="row">
            <div className="col-3 col">
              <label htmlFor="author">Author</label>
            </div>
            <div className="col-9 col">
              <input
                type="text"
                id="author"
                name="authorInput"
                className="post-form__input"
                disabled={!isNewPost}
                value={authorInput}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 col">
              <label htmlFor="title">Title</label>
            </div>
            <div className="col-9 col">
              <input
                type="text"
                id="title"
                name="titleInput"
                className="post-form__input"
                value={titleInput}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 col">
              <label htmlFor="category">Category</label>
            </div>
            <div className="col-9 col">
              <select
                name="categoryInput"
                id="category"
                className="post-form__input"
                disabled={!isNewPost}
                value={categoryInput}
                onChange={this.handleChange}
              >
                {this.props.categories.map(category => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-3 col">
              <label htmlFor="body">Text</label>
            </div>
            <div className="col-9 col">
              <textarea
                name="bodyInput"
                id="body"
                className="post-form__input"
                cols="30"
                rows="10"
                value={bodyInput}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col">
              <button
                type="submit"
                className="post-form__button"
                disabled={!this.isSubmitable()}
              >
                Submit
              </button>
              <button className="post-form__button">Cancel</button>
            </div>
          </div>
        </form>
      </div>
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

export default connect(mapStateToProps)(PostForm)
