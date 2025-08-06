import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContextObject";

const ProductCard = ({ product }) => {
  const { wishlistItems, dispatch } = useContext(WishlistContext);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();

    if (isWishlisted) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  return (
    <div className="relative p-4 transition border rounded shadow hover:shadow-lg">
      {/* Heart Button */}
      <button
        onClick={toggleWishlist}
        className="absolute z-10 top-2 right-2"
      >
        {isWishlisted ? (
          // ❤️ Red filled heart
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
        ) : (
          // 🤍 White outline heart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 7.5c0 4.5-9.75 11.25-9.75 11.25S2.25 12 2.25 7.5A5.25 5.25 0 0112 4.875 5.25 5.25 0 0121.75 7.5z"
            />
          </svg>
        )}
      </button>

      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-40 rounded"
        />
        <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="font-bold text-blue-600">₹{product.price * 80}</p>
      </Link>
    </div>
  );
};

export default ProductCard;