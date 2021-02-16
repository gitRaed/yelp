import React, { useContext, useState } from 'react';
import RestaurantsFinder from '../api/RestaurantsFinder.js'
import { RestaurantsContext } from '../context/RestaurantsContext.js';

const AddRestaurant = () => {

    const {addRestaurants} = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const response = await RestaurantsFinder.post("/", {
                name,
                location,
                price_range: priceRange,
            });
            console.log(response.data.data);
            addRestaurants(response.data.data.restaurants);

        } catch (error) {
            console.log("Handle submit, error : " + error);
        }
    }

    return(
        <div className="mb-4">
            <form action="">
            
                <div className="form-group row">

                    <div className="col">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="name" />
                    </div>

                    <div className="col">
                        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" placeholder="location" />
                    </div>

                    <div className="col">
                        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="form-control custom-select">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    
                    <button onClick={handleSubmit} type="submit" className="col btn btn-primary">Add</button>

                </div>

            </form> 
        </div>
    )
}

export default AddRestaurant;