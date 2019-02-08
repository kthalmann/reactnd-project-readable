import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404(props) {
  return (
    <div className="page404">
      <h1>404 Page not found</h1>
      <Link to="/" className="paper-btn">
        Back to Start
      </Link>
    </div>
  )
}
