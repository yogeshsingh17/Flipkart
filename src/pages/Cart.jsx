import toast from "react-hot-toast";
import { useCart } from "../context/useCart";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrenyContextObject";

const Cart = () => {

    const { cartItems, dispatch } = useCart();
    const { rate, loading, error } = useContext(CurrencyContext); // Dynamic exchange rate

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
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-4 border p-4 rounded"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p>
                                        ₹{Math.round(item.price * rate)} x {item.quantity}
                                    </p>
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

                    <div className="mt-6 text-xl font-bold">
                        Total: ₹{Math.round(total)}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;