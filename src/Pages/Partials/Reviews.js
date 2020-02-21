import React from 'react'

const Reviews = ({reviews})=>{
    const allReviews = reviews.map(review=>{
        return (
            <div key={review.id} className="review">
                <h3>{review.title}</h3>
                <div className="desc">{review.content}</div>
            </div>
        )
    })
    return(
        <div className="reviews">
            { allReviews }
        </div>

    )
}

export default Reviews