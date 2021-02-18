import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantsFinder from '../api/RestaurantsFinder';
import AddReview from '../components/addReview';
import Reviews from '../components/Reviews';
import { RestaurantsContext } from '../context/RestaurantsContext';


const RestaurantDetailPage = () => {

    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

    useEffect(() => {

        const fetchData = async() => {

            try {

                const response = await RestaurantsFinder.get("/"+id);
                setSelectedRestaurant(response.data.data);

            } catch (error) {
                
                console.log('Restaurant detail page, fetchDtata error : ' + error);
            }
        }
    
        fetchData();
    }, [])

    return (

        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurants.name}</h1>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>

                    <AddReview />
                </>
            )} 
        </div>
    )
};

export default RestaurantDetailPage;