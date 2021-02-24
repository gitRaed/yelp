import React, {useContext, useEffect} from 'react';
import RestaurantsFinder from "../api/RestaurantsFinder";
import StarRating from'./StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from "react-router-dom";

const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory();

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

    const handleDelete = async (e, id) => {

        e.stopPropagation();
        try {
            
            await RestaurantsFinder.delete("/" + id);
            // * this filter method will itterate throught our restaurant array, and only push restaurants which id doesnt match the id we want to delete
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }));

        } catch (error) {
            
            console.log('Handle delete, error : ' + error);
        }
    };

    const handleUpdate = (e, id) => {

        e.stopPropagation();
        history.push('/restaurants/' + id + '/update'); //* navigate to the url in bracket
    };

    const handleRestaurantSelect = (id) => {

        history.push('/restaurants/'+ id);
    }

    const renderRating = (restaurant) => {

        //? if there's no review
        if(!restaurant.count) {

            return (
                <span className="text-warning">0 reviews</span>
            )
        }

        return (
            <>
                <StarRating rating={restaurant.id}/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )
    }

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
                    //if restaurant has received the data from the api then map

                            return (
                                <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                    <td> {restaurant.name} </td>
                                    <td>{restaurant.location} </td>
                                    <td>{"$".repeat(restaurant.price_range)} </td>
                                    <td>{renderRating(restaurant)}</td>
                                    <td> <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button> </td>
                                    <td> <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button> </td>
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