import React from 'react';

const StarRating = ({rating}) => {

    const stars = [];

    for (let i = 1; i <=5; i++) {
        if( i <= rating) {
            stars.push(<i className="fas fa-star text-warning"></i>);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            //* this part is for implementing the half star rating
            //? Math.ceil returns the smallest integer greater than or equal to its numeric parameter
            //? isInteger returns true if the numeric parameter is an integer. Here we check if the number is not an integer

            stars.push(<i className="fas fa-star-half-alt text-warning"></i>);

        } else {
            stars.push(<i className="far fa-star text-warning"></i>);
        }
    }

    return (
        <>
            {stars}
        </>
    )
};

export default StarRating;