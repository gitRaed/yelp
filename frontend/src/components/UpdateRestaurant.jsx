import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantsFinder from '../api/RestaurantsFinder';

const UpdateRestaurant = (props) => {

    const {id} = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {

        const fetchData = async() => {

            const reponse = await RestaurantsFinder.get("/" + id);
            console.log(reponse);
            setName(reponse.data.data.restaurants.name);
            setLocation(reponse.data.data.restaurants.location);
            setPriceRange(reponse.data.data.restaurants.price_range);
        }

        fetchData();
    }, [])

    const handleSubmit = async(e) => {

        e.preventDefault();
        await RestaurantsFinder.put("/"+id, {

            name,
            location,
            price_range: priceRange
        });
        history.push('/');
    };

    return (
        <div>
            <form action="">

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="price_range" type="number" className="form-control"/>
                </div>
                <br/>    
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>

            </form>
        </div>
    );
}

export default UpdateRestaurant;