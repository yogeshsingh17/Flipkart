import axios from "axios";
import { useEffect, useState } from "react"

const CategoryFilter = ({ selectedCategories, setSelectedCategories }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products/categories/");
                const data = response.data;
                setCategories(data);
            } catch (error){
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

    console.log(categories);

    return (
        <div className="flex flex-wrap gap-2 p-4 mb-4 rounded shadow bg-base-100 text-base-content">
            <div>Categories</div>
            <div>
                {selectedCategories.length > 0 ? (
                    <span>Selected Categories: {selectedCategories.join(", ")}</span>
                ) : (
                    <span>No Categories Selected</span>
                )}
            </div>
            {categories.map((cat) => {
                const catName = typeof cat === 'string' ? cat : (cat.name);
                return (
                    <button
                        key={catName}
                        onClick={() => toggleCategory(catName)}
                        className={`badge badge-outline cursor-pointer px-4 capitalize ${selectedCategories.includes(catName) ? "bg-base-300" : ""}`}
                    >
                        {catName}
                    </button>
                );
            })}
        </div>
    )
}

export default CategoryFilter;