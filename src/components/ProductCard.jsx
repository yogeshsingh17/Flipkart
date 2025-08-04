import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
        <Link to={`/product/${product.id}`}>
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-blue-600 font-bold">₹{product.price * 80}</p>
        </Link>
    </div>
  );
};

export default ProductCard;