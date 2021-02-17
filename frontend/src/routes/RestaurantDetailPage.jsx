import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantsFinder from '../api/RestaurantsFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';


const RestaurantDetailPage = () => {

    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

    useEffect(() => {

        const fetchData = async() => {

            try {

                const response = await RestaurantsFinder.get("/"+id);
                setSelectedRestaurant(response.data.data.restaurants);

            } catch (error) {
                
                console.log('Restaurant detail page, fetchDtata error : ' + error);
            }
        }
    
        fetchData();
    }, [])

    return (

        <div>
            {selectedRestaurant && selectedRestaurant.name} 
        </div>
    )
};

export default RestaurantDetailPage;