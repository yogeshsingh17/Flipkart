import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
        .then(res => setProducts(res.data.products))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;