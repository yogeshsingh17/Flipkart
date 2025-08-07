import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const priceOptions = [
    { label: "All", value: "" },
    { label: "Under ₹1000", value: "1000" },
    { label: "Under ₹5000", value: "5000" },
    { label: "Under ₹10000", value: "10000" },
    { label: "₹10000+", value: "10000+" },
];

const CustomDropdown = ({ selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (value) => {
        setSelected(value);
        setIsOpen(false);
    };

  // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded bg-base-100 text-base-content hover:border-blue-500"
        >
            <span>
            {
                priceOptions.find(option => option.value === selected)?.label ||
                "Select Price"
            }
            </span>
            <ChevronDown className="w-4 h-4 bg-base-100 text-base-content" />
        </button>

        {isOpen && (
            <ul className="absolute z-20 w-full mt-2 border border-gray-300 rounded shadow bg-base-100 text-base-content">
            {priceOptions.map((option) => (
                <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-4 py-2 border-b cursor-pointer hover:bg-blue-400 last:border-b-0"
                >
                {option.label}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default CustomDropdown;
