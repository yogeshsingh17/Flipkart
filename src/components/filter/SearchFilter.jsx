// src/components/filters/SearchFilter.jsx
import { useState } from "react";
import { Search } from "lucide-react";

const SearchFilter = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="flex items-center w-full max-w-md p-2 border rounded shadow bg-base-100 text-base-content">
            <Search className="w-5 h-5 mr-2 text-gray-500" />
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleInputChange}
                className="w-full px-2 py-1 focus:outline-none"
            />
        </div>
    );
};

export default SearchFilter;