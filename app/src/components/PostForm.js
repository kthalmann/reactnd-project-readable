import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateUID } from '../utils/index'
import { handleAddPost, handleUpdatePost } from '../actions/posts'
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  initialState = {
    authorInput: '',
    titleInput: '',
    categoryInput: '',
    bodyInput: ''
  }

  constructor(props) {
    super(props)

    // get category from query parameter
    const category = props.categories.find(
      category => category.name === props.category
    )

    this.state = {
      ...this.initialState,
      categoryInput: category ? category.name : ''
    }

    if (!this.props.post) return

    this.state = {
      authorInput: this.props.post.author,
      titleInput: this.props.post.title,
      categoryInput: this.props.post.category,
      bodyInput: this.props.post.body
    }
  }

  /**
   * Handle change of input values
   *
   * @param e
   */
  handleChange = e => {
    const field = e.target.name
    const value = e.target.value

    this.setState({
      [field]: value
    })
  }

  /**
   * Handle submission of form
   *
   * @param e
   */
  handleSubmit = e => {
    e.preventDefault()

    if (this.props.post) {
      this.updatePost()
    } else {
      this.addNewPost()
    }
  }

  addNewPost = _ => {
    const { titleInput, bodyInput, authorInput, categoryInput } = this.state

    // build new post object
    const newPost = {
      id: generateUID(),
      timestamp: +Date.now(),
      title: titleInput,
      body: bodyInput,
      author: authorInput,
      category: categoryInput
    }

    this.props.dispatch(handleAddPost(newPost, this.successCallback))
  }

  updatePost = _ => {
    const { titleInput, bodyInput } = this.state

    this.props.dispatch(
      handleUpdatePost(
        this.props.post.id,
        titleInput,
        bodyInput,
        this.successCallback
      )
    )
  }

  /**
   * Called after successfully added or edited post
   *
   * @param postId
   * @param category
   */
  successCallback = (postId, category) => {
    // reset input fields
    this.setState(this.initialState)

    // redirect to detail view
    this.props.history.push(`/${category}/${postId}`)
  }

  /**
   * Check if form is allowed to submit
   *
   * @returns boolean
   */
  isSubmitable = _ => {
    const { authorInput, titleInput, categoryInput, bodyInput } = this.state

    return authorInput && titleInput && categoryInput && bodyInput
  }

  render() {
    const { post, category } = this.props
    const { authorInput, titleInput, categoryInput, bodyInput } = this.state
    const isNewPost = !post

    return (
      <div>
        <form
          action=""
          className="post-form border border-dashed"
          onSubmit={this.handleSubmit}
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
                value={categoryInput ? categoryInput : category}
                onChange={this.handleChange}
              >
                <option value="">Choose category</option>
                {this.props.categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
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
              <button
                type="button"
                className="post-form__button"
                onClick={this.props.history.goBack}
              >
                Cancel
              </button>
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

export default withRouter(connect(mapStateToProps)(PostForm))
