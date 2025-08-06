import toast from "react-hot-toast";
import { useCart } from "../context/useCart";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrenyContextObject";

const Cart = () => {

    const { cartItems, dispatch } = useCart();
    const { rate, loading, error } = useContext(CurrencyContext); // Dynamic exchange rate

    if (!rate) return <p className="p-6">Loading currency rate...</p>;
    if (loading) return <div className="p-6">Loading exchange rate...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
        toast.error("Item removed from cart");
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * rate * item.quantity, 0
    );

    return (
        <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="flex gap-6">
                    <ul className="w-3/5 space-y-4">
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
                                                onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}>
                                                    −
                                            </button>
                                        </span>
                                        <span className="px-2 py-1 border border-gray-300 rounded">
                                            <button 
                                                onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}>
                                                    +
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="w-2/5 p-4 text-xl font-bold border rounded min-h-fit max-h-fit">
                        <span className="text-gray-500">
                            Price Details
                        </span>
                        <hr className="mt-3 mb-3 border-t border-gray-300"></hr>
                        <span className="flex items-center justify-between font-bold">
                            <span>Total Amount</span> 
                            <span>₹{Math.round(total)}</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;