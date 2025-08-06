import { useReducer, useEffect } from "react";
import { WishlistContext } from "./WishlistContextObject";

const getInitialWishlist = () => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
};

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
        return [...state, action.payload];

        case "REMOVE_FROM_WISHLIST":
        return state.filter(item => item.id !== action.payload);

        default:
        return state;
    }
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, dispatch] = useReducer(wishlistReducer, getInitialWishlist());

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    return (
        <WishlistContext.Provider value={{ wishlistItems, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};