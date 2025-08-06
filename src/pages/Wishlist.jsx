import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContextObject";
import { CartContext } from "../context/CartContextObject";

const WishlistPage = () => {
    const { wishlistItems, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    const removeFromWishlist = (id) => {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
    };

    const moveToCart = (product) => {
        cartDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
        removeFromWishlist(product.id);
    };

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Your Wishlist</h1>
        
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {wishlistItems.map((product) => (
                        <div key={product.id} className="relative p-4 border rounded shadow">
                            {/* Heart icon to remove from wishlist */}
                            <button
                                onClick={() => removeFromWishlist(product.id)}
                                className="absolute top-2 right-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="red"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="red"
                                    className="w-6 h-6"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 7.5c0 4.5-9.75 11.25-9.75 11.25S2.25 12 2.25 7.5A5.25 5.25 0 0112 4.875 5.25 5.25 0 0121.75 7.5z"
                                />
                                </svg>
                            </button>

                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="object-cover w-full h-40 rounded"
                            />
                            <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="font-bold text-blue-600">₹{product.price * 80}</p>

                            {/* Move to Cart button */}
                            <button
                                onClick={() => moveToCart(product)}
                                className="px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Move to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;