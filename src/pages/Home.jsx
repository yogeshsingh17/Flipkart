import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { CurrencyContext } from "../context/CurrenyContextObject";
import PriceFilter from "../components/PriceFilter";
import SearchFilter from "../components/filter/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";

const ProductSkeleton = () => (
    <div className="flex flex-col gap-4 w-52">
        <div className="w-full h-32 skeleton"></div>
        <div className="h-4 skeleton w-28"></div>
        <div className="w-full h-4 skeleton"></div>
        <div className="w-full h-4 skeleton"></div>
    </div>
);

const Home = () => {
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [priceLimit, setPriceLimit] = useState(100000);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const limit = 30;

    const { rate, error } = useContext(CurrencyContext);

    const fetchProducts = async (page) => {
        const skip = (page-1) * limit;
        
        setProductsLoading(true);

        try {
            const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const data = response.data;
            setProducts(data.products);
            setTotalProducts(data.total);
        }
        catch (err) {
            console.error("Error fetching products:", err);
        }
        finally {
            setProductsLoading(false);
        }
    }

    // Make a function with dynamic api where we will fetch the url for all the products available.
    // Make the changes in the useEffect to call this function. whenever there is any change in this url.

    const fetchProductsByCategories = async () => {
        setProductsLoading(true);

        try {
            const allCategoryProducts = [];
            
            for(const category of selectedCategories) {
                const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
                allCategoryProducts.push(...response.data.products)
            }
            // const data = allCategoryProducts;
            setProducts(allCategoryProducts);
            setTotalProducts(allCategoryProducts.length);
        } catch (error) {
            console.error("Error fetching single product:", error);
        } finally {
            setProductsLoading(false);
        }
    }

    useEffect(() => {
        if (selectedCategories.length > 0) {
            fetchProductsByCategories();
        }
    }, [selectedCategories]);

    useEffect(() => {
        if (selectedCategories.length === 0) {
            fetchProducts(currentPage);
        }
    }, [currentPage]);

    const filteredProducts = products.filter((product) => {
        const priceInINR = product.price * (rate || 1); // Use rate or default to 1 if not available
        const matchesPrice = priceInINR <= priceLimit;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategories.length === 0 || selectedCategories.map((cat) => cat.toLowerCase()).includes(product.category.toLowerCase());
        return matchesPrice && matchesSearch && matchCategory;
    });

    const totalPages = Math.ceil(totalProducts / limit);


    // Only block UI if currency rate is missing or error
    if (error) return <p className="p-6 text-red-600">{error}</p>;
    if (!rate) return <p className="p-6">Loading currency rate...</p>;

    console.log("Fetched products:", products);
    console.log("Selected categories:", selectedCategories);

    return (
        <div className="flex gap-6 p-4">
            {/* Sidebar: Filters */}
            <div className="w-[20%] space-y-4">
                <SearchFilter onSearch={setSearchQuery} />
                <PriceFilter min={0} max={500000} onChange={setPriceLimit} />
                <CategoryFilter 
                    selectedCategories={selectedCategories} 
                    setSelectedCategories={setSelectedCategories}
                />
            </div>

            {/* Main: Products */}
            <div className="w-[80%]">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {productsLoading ? (
                        // Show 8 skeletons
                        Array.from({ length: 8 }).map((_, index) => 
                            <ProductSkeleton key={index} />
                    )) : (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="mt-4 text-gray-500">No products match your search or price filter.</p>
                )}

                {/* Pagination Controls */}
                {selectedCategories.length === 0 && (
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="flex items-center bg-base-100 text-base-content">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;