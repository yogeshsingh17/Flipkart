import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/useCart";

const ProductDetails = () => {
    const { id } = useParams(); // get ID from URL
    const [product, setProduct] = useState(null);
    const { dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({ type: "ADD_TO_CART", payload: product });
        toast.success("Item added to cart");
    };

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }, [id]);

    if (!product) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div>
            <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-lg w-full h-auto object-cover"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images.map((img, index) => (
                <img
                key={index}
                src={img}
                alt=""
                className="w-20 h-20 object-cover rounded border"
                />
            ))}
            </div>
        </div>

        {/* Product Info Section */}
        <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="mt-4 text-lg text-gray-800">{product.description}</p>
            <p className="mt-4 text-xl font-bold text-blue-600">₹{product.price * 80}</p>
            <p className="text-sm text-yellow-600 mt-1">⭐ {product.rating} / 5</p>

            <button
                onClick={handleAddToCart} 
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Add to Cart
            </button>
        </div>
    </div>
    );
};

export default ProductDetails;