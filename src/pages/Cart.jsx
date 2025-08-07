import toast from "react-hot-toast";
import { useCart } from "../context/useCart";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrenyContextObject";
import { WishlistContext } from "../context/WishlistContextObject";

const Cart = () => {

    const { cartItems, dispatch: cartDispatch } = useCart();
    const { rate, loading, error } = useContext(CurrencyContext); // Dynamic exchange rate

    const {wishlistItems, dispatch: wishlistDispatch} = useContext(WishlistContext);

    if (!rate) return <p className="p-6">Loading currency rate...</p>;
    if (loading) return <div className="p-6">Loading exchange rate...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    const moveToCart = (item) => {
        // Ensure product has price as a number and all required fields
        cartDispatch({ type: "ADD_TO_CART", payload: { ...item, quantity: 1, price: Number(item.price) } });
        removeFromWishlist(item.id);
    };

    const moveToWishlist = (item) => {
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: item });
        removeItem(item.id)
    };

    const removeItem = (id) => {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
        toast.error("Item removed from cart");
    };

    const removeFromWishlist = (id) => {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * rate * item.quantity, 0
    );

    return (
        <div className="flex gap-6 p-6 bg-base-100 text-base-content">
            <div className="w-3/5">
                {/* Cart Section */}
                <div>
                    <h2 className="mb-4 text-2xl font-bold bg-base-100 text-base-content">Your Cart</h2>

                    {cartItems.length === 0 ? (
                        <p className="bg-base-100 text-base-content">Your cart is empty.</p>
                    ) : (
                        <div className="flex gap-6">
                            <ul className="w-full space-y-4">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center gap-4 p-4 border rounded"
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="object-cover w-20 h-20 rounded"
                                        />
                                        <div className="flex flex-col flex-1 gap-2">
                                            <div className="flex-1 gap-2">
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p>
                                                    ₹{Math.round(item.price * rate)} x {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 border border-gray-300 rounded">
                                                    <button 
                                                        onClick={() => cartDispatch({ type: "DECREASE_QUANTITY", payload: item.id })}>
                                                            −
                                                    </button>
                                                </span>
                                                <span className="px-2 py-1 border border-gray-300 rounded">
                                                    <button 
                                                        onClick={() => cartDispatch({ type: "INCREASE_QUANTITY", payload: item.id })}>
                                                            +
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => moveToWishlist(item)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Move to wishlist
                                        </button>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Wishlist Section */}
                <div className="mt-6">
                    <h2 className="mb-4 text-2xl font-bold">Your Wishlist</h2>
                    {wishlistItems.length === 0 ? (
                        <p>Your wishlist is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {wishlistItems.map((item) => (
                                <li key={item.id} className="flex items-center gap-4 p-4 border rounded">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="object-cover w-20 h-20 rounded"
                                    />
                                    <div className="flex flex-col flex-1 gap-2">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p>₹{Math.round(item.price * rate)}</p>
                                    </div>

                                    <button
                                        onClick={() => moveToCart(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Move to Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Total */}
            <div className="w-2/5 p-4 mt-12 text-xl font-bold border rounded min-h-fit max-h-fit">
                <span className="bg-base-100 text-base-content">
                    Price Details
                </span>
                <hr className="mt-3 mb-3 border-t bg-base-100 text-base-content"></hr>
                <span className="flex items-center justify-between font-bold">
                    <span>Total Amount</span> 
                    <span>₹{Math.round(total)}</span>
                </span>
            </div>
        </div>
    );
};

export default Cart;