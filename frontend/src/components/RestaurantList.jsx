import React, {useContext, useEffect} from 'react';
import RestaurantsFinder from "../api/RestaurantsFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);

    useEffect( () => {
        const fetchData =  async () => {

            try {
            
                const response = await RestaurantsFinder.get("/");
                setRestaurants(response.data.data.restaurants);

            } catch (error) {
                console.log('Restaurants list, error : ' + error);
            }

        };

        fetchData();

    }, [])

    return(
        <div className="list-group">
            <table className="table table-dark table-hover ">

                <thead className="bg-primary">
                <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>

                <tbody>

                    {restaurants && restaurants.map( (restaurant) => {
                    //if restaurants has received the data from the api then map
                            return (
                                <tr key={restaurant.id}>
                                    <td> {restaurant.name} </td>
                                    <td>{restaurant.location} </td>
                                    <td>{"$".repeat(restaurant.price_range)} </td>
                                    <td>reviews</td>
                                    <td> <button className="btn btn-warning">Update</button> </td>
                                    <td> <button className="btn btn-danger">Delete</button> </td>
                                </tr>
                            );
                        })

                    }

                </tbody>
            
            </table>
        </div>
    )

};

export default RestaurantList;