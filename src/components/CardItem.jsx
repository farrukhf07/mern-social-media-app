import React from 'react'

function CardItem({title, description, imageUrl, url, author, source}) {
  return (
    <div className="my-3">
        <div className="card">
            <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
            >
            {source}
            </span>
            <img
            src={
                !imageUrl
                ? "https://ichef.bbci.co.uk/news/1024/branded_news/f275/live/7f2b2010-750e-11f0-9cb3-2344cd85f55f.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>

                <p className="card-text">{description}...</p>

                <p className="card-text">
                    <small className="text-muted">
                    By {author ? author : "Unknown"}
                    </small>
                </p>

                <a
                    href={url} target="" rel="noreferrer" className="btn btn-sm btn-dark"
                >
                    Read More
                </a>
            </div>
        </div>
    </div>
  )
}

export default CardItem