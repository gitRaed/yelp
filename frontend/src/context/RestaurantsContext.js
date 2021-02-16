import React, {useState, createContext}  from "react";


export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    //* useState is a fonction that let us use state "virtually". The first parameter in the array is the name of the variable, the second one is 
    //* the fonction to change the first variable. For exemple, if set.restaurants(5) mean that restaurant's value is now 5.

    const addRestaurants = (restaurant) => {

        setRestaurants([...restaurants, restaurant]);
        console.log(restaurants);
    };

    return (

        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}