import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantsFinder from '../api/RestaurantsFinder';

const AddReview = () => {

    const location = useLocation(); //? useLocation gives us access to the page url
    const history = useHistory();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");


    const handleSubmitReview = async (e) => {

        try {

            e.preventDefault();
            await RestaurantsFinder.post("/"+id+"/addReview", {
                name,
                review: reviewText,
                rating
            });

            //? those 2 rows let us refresh the page
            history.push("/");
            history.push(location.pathname);

        } catch (error) {
            console.log('Handle submit review error : ' + error);
        }
    }

    return (
        <div className="mb-2">
            <form action="">

                <div className="form-group row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder="name" className="form-control"/>
                    </div>
                    
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} id="rating" className="form-control custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <br/>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>

                <br />
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>

            </form>
        </div>
    )
};

export default AddReview;