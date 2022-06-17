import React from 'react'

export default function NewsItem(props) {
      let {title, description, imageUrl, newsUrl, author, date, source} =  props;
    return (
      <div className='my-3'>
        <div className="card">
          <div className='position-absolute' style={{display: 'flex', justifyContent: 'flex-end', right: '0' }}>
        <span className="badge rounded-pill bg-danger" >
    {source}</span>
    </div>
  <img src={!imageUrl?"https://c.ndtvimg.com/2021-07/udd034m8_pegasus-hack-generic_625x300_21_July_21.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
</div>
    )
  
}

