import { useReducer, useEffect } from "react";
import { CartContext } from "./CartContextObject";

const getInitialCart = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    cartItems: getInitialCart(),
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existing = state.cartItems.find(item => item.id === action.payload.id);
            if (existing) {
                return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };
        }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
            };

        default:
        return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Persist to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
        {children}
        </CartContext.Provider>
    );
};