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
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
            {/* Product Image Section */}
            <div className="flex gap-4 p-4 border rounded shadow-2xl bg-base-100 text-base-content">
                {/* Thumbnail Images */}
                <div className="flex flex-col gap-2 mt-4 overflow-x-auto">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt=""
                            loading="lazy"
                            className="object-cover w-20 h-20 border rounded shadow-2xl cursor-pointer bg-base-100 text-base-content hover:border-black"
                        />
                    ))}
                </div>
                {/* Main Product Image */}
                <div className="flex items-center justify-center flex-1 p-5 border rounded bg-base-100 text-base-content">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-cover h-auto rounded-lg"
                    />
                </div>
            </div>

            {/* Product Info Section */}
            <div>
                <h2 className="text-2xl font-bold bg-base-100 text-base-content">
                    {product.title}
                </h2>
                <p className="bg-base-100 text-base-content">
                    {product.category}
                </p>
                <p className="mt-4 text-lg bg-base-100 text-base-content">
                    {product.description}
                </p>
                <p className="mt-4 text-xl font-bold text-blue-600">
                    ₹{product.price * 80}</p>
                <p className="mt-1 text-sm text-yellow-600">
                    ⭐ {product.rating} / 5
                </p>

                <button
                    onClick={handleAddToCart} 
                    className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;