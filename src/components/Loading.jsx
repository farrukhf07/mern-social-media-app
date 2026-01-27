import React from 'react'

function Loading({text="Loading..."}) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-3">
      <div className="spinner-border text-primary mb-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <small className="text-muted">{text}</small>
    </div>
  )
}

export default Loading