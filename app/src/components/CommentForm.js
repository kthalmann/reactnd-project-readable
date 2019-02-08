import React, { Component } from 'react';

class CommentForm extends Component {
  handleCreate = _ => {
    this.props.onCreate(this.authorInput.value, this.bodyTextInput.value);
  };
  handleUpdate = _ => {
    this.props.onUpdate(this.props.comment.id, this.bodyTextInput.value);
  };

  render() {
    const { comment, onClose } = this.props;
    const isNewComment = !comment;

    return (
      <div className="modal">
        <label className="modal-bg" htmlFor="modal-1" />
        <div className="modal-body">
          <button className="btn-close btn-link" onClick={onClose}>
            X
          </button>
          <h4 className="modal-title">
            {isNewComment ? 'Add' : 'Edit'} comment
          </h4>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              disabled={!isNewComment}
              defaultValue={isNewComment ? '' : this.props.comment.author}
              ref={input => (this.authorInput = input)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body-text">Message</label>
            <textarea
              className="comment-input"
              id="body-text"
              defaultValue={isNewComment ? '' : this.props.comment.body}
              ref={input => (this.bodyTextInput = input)}
            />
          </div>
          {isNewComment ? (
            <button onClick={this.handleCreate}>Create</button>
          ) : (
            <button onClick={this.handleUpdate}>Update</button>
          )}
        </div>
      </div>
    );
  }
}

export default CommentForm;
