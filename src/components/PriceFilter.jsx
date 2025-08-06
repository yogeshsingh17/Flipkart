// src/components/filters/PriceFilter.jsx
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const PriceFilter = ({ priceLimit, min, max, onChange }) => {

    const [value, setValue] = useState(max);

    const handleChange = (e) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <>
            <div className="p-4 mb-4 bg-white rounded shadow">
                <h3 className="mb-2 text-lg font-semibold">
                    Filters
                </h3>
                <hr className="mb-2" />
                <h3 className="mb-2 text-base font-semibold">
                    Price
                </h3>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="w-full"
                />
                <div className="mt-2 text-sm text-gray-600">
                    Under ₹{value}
                </div>
            </div>

            <div className="flex flex-col items-center p-4 space-x-2 rounded shadow">
                <label htmlFor="priceFilter" className="font-medium text-gray-700">
                    Filter by Price:
                </label>
                <CustomDropdown selected={priceLimit} setSelected={onChange}/>
            </div>
        </>
    );
};

export default PriceFilter;