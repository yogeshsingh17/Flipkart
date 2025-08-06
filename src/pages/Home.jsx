import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { CurrencyContext } from "../context/CurrenyContextObject";
import PriceFilter from "../components/PriceFilter";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [priceLimit, setPriceLimit] = useState(100000);
    const {rate, loading, error} = useContext(CurrencyContext);
    const filteredProducts = products.filter(product => product.price*rate <= priceLimit);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
        .then(res => setProducts(res.data.products))
        .catch(err => console.error(err));
    }, []);

    if(!rate) return <p className="p-6">Loading currency rate...</p>;
    if(loading) return <p className="p-6">Loading products...</p>;
    if(error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <div className="flex gap-6 p-4">
            <div className="w-[20%]">
                <PriceFilter min={0} max={500000} onChange={setPriceLimit} />
            </div>
            <div className="w-[80%]">
                {/* <h2 className="mb-4 text-2xl font-bold">All Products</h2> */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;